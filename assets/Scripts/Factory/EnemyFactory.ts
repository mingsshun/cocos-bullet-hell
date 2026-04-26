import { Vec3 } from 'cc';
import { PoolKey } from '../Constants/PoolKey';
import { PoolManager } from '../Core/pool/PoolManager';
import { EnemyAuthoring } from '../Authoring/EnemyAuthoring';
import { EntityType } from '../Constants/EntityType';
import { EntityManager } from '../Core/EntityManager';

export class EnemyFactory {

    static spawn(pos: Vec3) {

        const isChaser = Math.random() < 0.6;

        const key = isChaser
            ? PoolKey.ENEMY_CHASER
            : PoolKey.ENEMY_SHOOTER;

        const node = PoolManager.spawn(key);
        node.setWorldPosition(pos);

        const authoring = node.getComponent(EnemyAuthoring);
        authoring.isChaser = isChaser;
        authoring.init();

        const entity = authoring.getEntity();
        EntityManager.add(entity);

        return entity;
    }
}