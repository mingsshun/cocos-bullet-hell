import { ComponentKey } from "../Constants/ComponentKey";
import { EntityManager } from "../Core/EntityManager";
import { InputManager } from "../Input/InputManager";

export class InputSystem {
    static update() {
        const player = EntityManager.getPlayer();
        if (!player) return;

        const move = player.getComponent(ComponentKey.MOVE);
        if (!move) return;

        const dir = InputManager.instance.getMoveDir();

        move.direction.set(dir.x, dir.y, 0);
    }
}