import { GameConfig } from '../Config';
import { ComponentKey } from '../Constants/ComponentKey';
import { EntityManager } from '../Core/EntityManager';
import { InputManager } from '../Input/InputManager';

export class DashSystem {

    static update(dt: number) {

        const player = EntityManager.getPlayer();
        if (!player) return;

        const dash = player.getComponent(ComponentKey.DASH);
        const move = player.getComponent(ComponentKey.MOVE);

        if (!dash || !move) return;

        if (dash.cooldownTimer > 0) {
            dash.cooldownTimer -= dt;
        }

        if (dash.isDashing) {
            dash.timer -= dt;

            move.direction.set(dash.direction);

            if (dash.timer <= 0) {
                dash.isDashing = false;
                // move.speed /= dash.speedMultiplier;
                move.speed = GameConfig.player.speed;
            }

            return;
        }

        if (dash.cooldownTimer <= 0 && InputManager.instance.isDashPressed()) {
            if (move.direction.lengthSqr() === 0) return;

            dash.isDashing = true;
            dash.timer = dash.duration;
            dash.cooldownTimer = dash.cooldown;

            dash.direction.set(move.direction).normalize();

            // move.speed *= dash.speedMultiplier;
            move.speed = GameConfig.player.dash_speed;
        }
    }
}