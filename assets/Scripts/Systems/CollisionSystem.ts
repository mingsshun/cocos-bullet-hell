import { Vec3 } from 'cc';
import { EntityManager } from '../Core/EntityManager';
import { ComponentKey } from '../Constants/ComponentKey';
import { Entity } from '../Entity/Entity';
import { PoolManager } from '../Core/pool/PoolManager';
import { GameManager } from '../Core/GameManager';

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
                    b.node.worldPosition, bCol.radius,
                    e.node.worldPosition, eCol.radius
                )) continue;

                const health = e.getComponent(ComponentKey.HEALTH);
                health.hp -= dmg.value;

                this.releaseEntity(b);

                if (health.hp <= 0) {
                    this.releaseEntity(e);
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
                b.node.worldPosition, bCol.radius,
                player.node.worldPosition, pCol.radius
            )) continue;

            pHealth.hp -= dmg.value;

            this.releaseEntity(b);

            if (pHealth.hp <= 0) {
                player.isRelease = true;
                player.node.active = false;

                GameManager.gameOver(false);
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

            if (!this.isCollide(
                e.node.worldPosition, eCol.radius,
                player.node.worldPosition, pCol.radius
            )) continue;

            pHealth.hp -= 10;

            this.releaseEntity(e);

            if (pHealth.hp <= 0) {
                player.isRelease = true;
                player.node.active = false;

                GameManager.gameOver(false);
            }
        }
    }

    static isCollide(posA: Vec3, rA: number, posB: Vec3, rB: number): boolean {
        return Vec3.distance(posA, posB) <= (rA + rB);
    }

    static releaseEntity(entity: Entity) {

        if (entity.isRelease) return;

        entity.isRelease = true;

        PoolManager.release(entity.poolKey, entity.node);
    }
}