import { AIType } from "../Components/AIComponent";
import { ComponentKey } from "../Constants/ComponentKey";
import { EntityManager } from "../Core/EntityManager";

export class AISystem {
    static update() {
        const player = EntityManager.getPlayer();

        for (const e of EntityManager.enemies) {

            const ai = e.getComponent(ComponentKey.AI);
            if (!ai) continue;

            if (ai.type === AIType.CHASER) {
                const move = e.getComponent(ComponentKey.MOVE);

                const dir = player.node.worldPosition.clone()
                    .subtract(e.node.worldPosition)
                    .normalize();

                move.direction.set(dir);
            }
        }
    }
}