import { Vec3 } from "cc";

export class MathUtil {
    static distanceSqr(a: Vec3, b: Vec3): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        const distSqr = dx * dx + dy * dy;
        return distSqr;
    }
}


