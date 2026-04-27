import { Vec3 } from 'cc';
import { EntityManager } from '../Core/EntityManager';
import { ComponentKey } from '../Constants/ComponentKey';
import { EntityType } from '../Constants/EntityType';
import { BulletFactory } from '../Factory/BulletFactory';
import { MathUtil } from '../Utils/MathUtil';

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

                const dist = MathUtil.distanceSqr(entity.node.position, player.node.position);
                if (dist <= shoot.range * shoot.range) {
                    target = player;
                }
            }

            if (!target) continue;

            // ===== shoot =====
            const dir = new Vec3();
            Vec3.subtract(dir, target.node.position, entity.node.position);
            dir.normalize();

            if (entity.type === EntityType.PLAYER) {
                BulletFactory.spawnPlayerBullet(entity.node.position, dir);
            } else {
                BulletFactory.spawnEnemyBullet(entity.node.position, dir);
            }

            shoot.timer = shoot.cooldown;
        }
    }

    static findNearest(source, list, range) {
        let nearest = null;
        let minDist = Infinity;

        const pos = source.node.position;

        for (const e of list) {
            const dist = MathUtil.distanceSqr(pos, e.node.position);

            if (dist < minDist * minDist && dist <= range * range) {
                minDist = dist;
                nearest = e;
            }
        }

        return nearest;
    }
}