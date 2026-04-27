import { Vec3 } from "cc";
import { GameConfig } from "../Config";
import { ComponentKey } from "../Constants/ComponentKey";
import { EntityType } from "../Constants/EntityType";
import { EntityManager } from "../Core/EntityManager";

export class MoveSystem {
    static update(dt: number) {

        const list = EntityManager.all;

        for (const entity of list) {

            const move = entity.getComponent(ComponentKey.MOVE);
            if (!move) continue;

            const dir = move.direction;

            if (dir.lengthSqr() === 0) continue;

            const pos = entity.node.position.clone();

            pos.x += dir.x * move.speed * dt;
            pos.y += dir.y * move.speed * dt;

            if (entity.type === EntityType.PLAYER) {

                pos.x = Math.max(GameConfig.map.minX, Math.min(GameConfig.map.maxX, pos.x));
                pos.y = Math.max(GameConfig.map.minY, Math.min(GameConfig.map.maxY, pos.y));
            }

            if (
                entity.type === EntityType.PLAYER_BULLET ||
                entity.type === EntityType.ENEMY_BULLET
            ) {
                if (this.isOutOfMap(pos)) {
                    EntityManager.release(entity);
                }
            }

            entity.node.setPosition(pos);
        }
    }

    static isOutOfMap(pos: Vec3): boolean {
        return (
            pos.x < GameConfig.map.minX ||
            pos.x > GameConfig.map.maxX ||
            pos.y < GameConfig.map.minY ||
            pos.y > GameConfig.map.maxY
        );
    }
}


