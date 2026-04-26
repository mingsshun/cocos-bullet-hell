import { Vec3 } from "cc";
import { EntityManager } from "../Core/EntityManager";
import { EnemyFactory } from "../Factory/EnemyFactory";
import { GameConfig } from "../Config";

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

        const pos = this.getSpawnPos(player.node.worldPosition);

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

        const map = GameConfig.map;
        do {
            const x = this.randomRange(map.minX, map.maxX);
            const y = this.randomRange(map.minY, map.maxY);

            pos = new Vec3(x, y, 0);
            tries++;

        } while (
            Vec3.distance(pos, playerPos) < 150 &&
            tries < 10
        );

        return pos;
    }
}