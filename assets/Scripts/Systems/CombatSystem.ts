import { Vec3 } from 'cc';
import { EntityManager } from '../Core/EntityManager';
import { ComponentKey } from '../Constants/ComponentKey';
import { EntityType } from '../Constants/EntityType';
import { BulletFactory } from '../Factory/BulletFactory';

export class CombatSystem {

    static update(dt: number) {

        const all = EntityManager.all;

        for (const entity of all) {

            const shoot = entity.getComponent(ComponentKey.SHOOT);
            if (!shoot) continue;

            shoot.timer -= dt;
            if (shoot.timer > 0) continue;

            // ===== find target =====
            let target = null;

            if (entity.type === EntityType.PLAYER) {
                target = this.findNearest(entity, EntityManager.enemies, shoot.range);
            } else {
                const player = EntityManager.getPlayer();
                if (!player) continue;

                const dist = Vec3.distance(entity.node.worldPosition, player.node.worldPosition);
                if (dist <= shoot.range) {
                    target = player;
                }
            }

            if (!target) continue;

            // ===== shoot =====
            const dir = new Vec3();
            Vec3.subtract(dir, target.node.worldPosition, entity.node.worldPosition);
            dir.normalize();

            if (entity.type === EntityType.PLAYER) {
                BulletFactory.spawnPlayerBullet(entity.node.worldPosition, dir);
            } else {
                BulletFactory.spawnEnemyBullet(entity.node.worldPosition, dir);
            }

            shoot.timer = shoot.cooldown;
        }
    }

    static findNearest(source, list, range) {
        let nearest = null;
        let minDist = Infinity;

        const pos = source.node.worldPosition;

        for (const e of list) {
            const dist = Vec3.distance(pos, e.node.worldPosition);

            if (dist < minDist && dist <= range) {
                minDist = dist;
                nearest = e;
            }
        }

        return nearest;
    }
}