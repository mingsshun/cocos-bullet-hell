import { ComponentKey } from "../Constants/ComponentKey";
import { EntityManager } from "../Core/EntityManager";

export class MoveSystem {
    static update(dt: number) {

        const list = EntityManager.all;

        for (const entity of list) {

            const move = entity.getComponent(ComponentKey.MOVE);
            if (!move) continue;

            const dir = move.direction;

            if (dir.lengthSqr() === 0) continue;

            const pos = entity.node.worldPosition.clone();

            pos.x += dir.x * move.speed * dt;
            pos.y += dir.y * move.speed * dt;

            entity.node.setWorldPosition(pos);
        }
    }
}


