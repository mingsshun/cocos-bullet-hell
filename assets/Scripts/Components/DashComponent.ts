import { Vec3 } from "cc";

export class DashComponent {
    isDashing: boolean = false;

    duration: number = 0.15;
    timer: number = 0;

    cooldown: number = 1;
    cooldownTimer: number = 0;

    speedMultiplier: number = 3;

    direction: Vec3 = new Vec3();
}