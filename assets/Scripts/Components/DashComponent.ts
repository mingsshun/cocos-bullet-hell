import { Vec3 } from "cc";

export class DashComponent {
    isDashing = false;

    duration = 0.15;
    timer = 0;

    cooldown = 1;
    cooldownTimer = 0;

    speedMultiplier = 3;

    direction = new Vec3();
}