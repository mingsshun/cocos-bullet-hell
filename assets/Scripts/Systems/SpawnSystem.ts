import { Vec3 } from "cc";
import { EntityManager } from "../Core/EntityManager";
import { EnemyFactory } from "../Factory/EnemyFactory";
import { GameConfig } from "../Config";
import { MathUtil } from "../Utils/MathUtil";

export class SpawnSystem {

    private static timer = 0;
    private static decayRate = GameConfig.spawn_enemy.decay_rate;
    private static minInterval = GameConfig.spawn_enemy.min_interval;
    private static interval = GameConfig.spawn_enemy.start_interval;

    static reset() {
        this.interval = GameConfig.spawn_enemy.start_interval;
        this.timer = 0;
    }

    static update(dt: number) {

        this.timer -= dt;
        if (this.timer > 0) return;

        const player = EntityManager.getPlayer();
        if (!player) return;

        const pos = this.getSpawnPos(player.node.position);

        EnemyFactory.spawn(pos);

        this.timer = this.interval;

        this.interval = Math.max(this.minInterval, this.interval * this.decayRate);
    }

    static randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static getSpawnPos(playerPos: Vec3): Vec3 {

        let pos: Vec3;
        let tries = 0;
        let distanceSqr = 0;

        const minDistance = GameConfig.spawn_enemy.min_dist;
        const maxDistance = GameConfig.spawn_enemy.max_dist;

        const map = GameConfig.map;
        do {
            const x = this.randomRange(map.minX, map.maxX);
            const y = this.randomRange(map.minY, map.maxY);

            pos = new Vec3(x, y, 0);
            tries++;

            distanceSqr = MathUtil.distanceSqr(pos, playerPos)

        } while (
            distanceSqr < minDistance * minDistance &&
            distanceSqr > maxDistance * maxDistance &&
            tries < 10
        );

        return pos;
    }
}