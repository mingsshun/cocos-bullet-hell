import { Vec3 } from 'cc';
import { EnemyAuthoring } from '../Authoring/EnemyAuthoring';
import { PoolKey } from '../Constants/PoolKey';
import { EntityManager } from '../Core/EntityManager';
import { PoolManager } from '../Core/pool/PoolManager';
import { GameManager } from '../Core/GameManager';
import { GameConfig } from '../Config';

export class EnemyFactory {

    static spawn(pos: Vec3) {

        const key = this.getEnemyPoolKey();

        const node = PoolManager.spawn(key);
        node.setWorldPosition(pos);

        const authoring = node.getComponent(EnemyAuthoring);
        authoring.init();

        const entity = authoring.getEntity();
        EntityManager.add(entity);

        return entity;
    }

    static getEnemyPoolKey(): PoolKey {

        const time = GameManager.instance.getTime();
        const t = Math.min(time / GameConfig.game_duration, 1); // normalize 0 → 1

        const shooterRatio = this.lerp(0.2, 0.5, t);

        return Math.random() < shooterRatio
            ? PoolKey.ENEMY_SHOOTER
            : PoolKey.ENEMY_CHASER;
    }

    static lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }
}