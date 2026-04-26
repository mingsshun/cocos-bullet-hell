import { Vec3 } from "cc";
import { GameConfig } from "../Config";

export class DashComponent {
    isDashing: boolean = false;

    duration: number = GameConfig.player.dash_duration;
    timer: number = 0;

    cooldown: number = GameConfig.player.dash_cooldown;
    cooldownTimer: number = 0;

    speedMultiplier: number = 3;

    direction: Vec3 = new Vec3();
}