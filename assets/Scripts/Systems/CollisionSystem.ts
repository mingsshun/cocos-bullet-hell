import { Vec3 } from 'cc';
import { EntityManager } from '../Core/EntityManager';
import { ComponentKey } from '../Constants/ComponentKey';
import { Entity } from '../Entity/Entity';
import { PoolManager } from '../Core/pool/PoolManager';
import { GameManager } from '../Core/GameManager';
import { MathUtil } from '../Utils/MathUtil';
import { EnemyAuthoring } from '../Authoring/EnemyAuthoring';
import { PlayerAuthoring } from '../Authoring/PlayerAuthoring';

export class CollisionSystem {
    static update() {
        this.playerBulletVsEnemy();
        this.enemyBulletVsPlayer();
        this.enemyVsPlayer();
    }

    static playerBulletVsEnemy() {
        const bullets = EntityManager.playerBullets;
        const enemies = EntityManager.enemies;

        for (const b of bullets) {

            if (b.isRelease) continue;

            const bCol = b.getComponent(ComponentKey.COLLIDER);
            const dmg = b.getComponent(ComponentKey.DAMAGE);

            for (const e of enemies) {

                if (e.isRelease) continue;

                const eCol = e.getComponent(ComponentKey.COLLIDER);

                if (!this.isCollide(
                    b.node.position, bCol.radius,
                    e.node.position, eCol.radius
                )) continue;

                const health = e.getComponent(ComponentKey.HEALTH);
                health.hp -= dmg.value;

                EntityManager.release(b);

                if (health.hp <= 0) {
                    EntityManager.release(e);
                }

                break;
            }
        }
    }

    static enemyBulletVsPlayer() {
        const player = EntityManager.getPlayer();
        if (!player || player.isRelease) return;

        const bullets = EntityManager.enemyBullets;

        const pCol = player.getComponent(ComponentKey.COLLIDER);
        const pHealth = player.getComponent(ComponentKey.HEALTH);

        for (const b of bullets) {

            if (b.isRelease) continue;

            const bCol = b.getComponent(ComponentKey.COLLIDER);
            const dmg = b.getComponent(ComponentKey.DAMAGE);

            if (!this.isCollide(
                b.node.position, bCol.radius,
                player.node.position, pCol.radius
            )) continue;

            pHealth.hp -= dmg.value;
            GameManager.updateHp(pHealth.hp);

            EntityManager.release(b);

            if (pHealth.hp <= 0) {
                player.isRelease = true;
                player.node.active = false;

                GameManager.gameOver(false);
            }
            else {
                const authoring = player.node.getComponent(PlayerAuthoring);
                authoring?.playHitFlash();
            }
        }
    }

    static enemyVsPlayer() {
        const player = EntityManager.getPlayer();
        if (!player || player.isRelease) return;

        const enemies = EntityManager.enemies;

        const pCol = player.getComponent(ComponentKey.COLLIDER);
        const pHealth = player.getComponent(ComponentKey.HEALTH);

        for (const e of enemies) {

            if (e.isRelease) continue;

            const eCol = e.getComponent(ComponentKey.COLLIDER);
            const eDmg = e.getComponent(ComponentKey.DAMAGE);

            if (!this.isCollide(
                e.node.position, eCol.radius,
                player.node.position, pCol.radius
            )) continue;

            pHealth.hp -= eDmg.value;
            GameManager.updateHp(pHealth.hp);

            EntityManager.release(e);

            if (pHealth.hp <= 0) {
                player.isRelease = true;
                player.node.active = false;

                GameManager.gameOver(false);
            }
            else {
                const authoring = player.node.getComponent(PlayerAuthoring);
                authoring?.playHitFlash();
            }
        }
    }

    static isCollide(posA: Vec3, rA: number, posB: Vec3, rB: number): boolean {

        return MathUtil.distanceSqr(posA, posB) <= (rA + rB) * (rA + rB);
    }
}