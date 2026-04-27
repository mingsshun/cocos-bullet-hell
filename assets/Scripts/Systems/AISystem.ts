import { Vec3 } from "cc";
import { AIType } from "../Components/AIComponent";
import { ComponentKey } from "../Constants/ComponentKey";
import { EntityManager } from "../Core/EntityManager";
import { MathUtil } from "../Utils/MathUtil";

export class AISystem {
    static update() {
        const player = EntityManager.getPlayer();
        if (!player) return;

        const playerPos = player.node.worldPosition;

        for (const e of EntityManager.enemies) {
            if (e.isRelease) continue;
            const enemyPos = e.node.worldPosition;

            const move = e.getComponent(ComponentKey.MOVE);
            const shoot = e.getComponent(ComponentKey.SHOOT);

            if (move) {
                const dir = playerPos.clone()
                    .subtract(enemyPos)
                    .normalize();

                move.direction.set(dir);

                const angle = this.getAngle(enemyPos, playerPos) + 90;
                e.node.setRotationFromEuler(0, 0, angle);
            }
            else if (shoot) {
                const dist = MathUtil.distanceSqr(enemyPos, playerPos);

                if (dist <= shoot.range * shoot.range) {
                    const angle = this.getAngle(enemyPos, playerPos) + 90;
                    e.node.setRotationFromEuler(0, 0, angle);
                }
            }
        }
    }

    static getAngle(from: Vec3, to: Vec3): number {
        const dir = to.clone().subtract(from).normalize();
        return Math.atan2(dir.y, dir.x) * 180 / Math.PI;
    }
}