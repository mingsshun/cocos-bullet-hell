import { Vec3 } from "cc";
import { PoolKey } from "../Constants/PoolKey";
import { PoolManager } from "../Core/pool/PoolManager";
import { BulletAuthoring } from "../Authoring/BulletAuthoring";
import { EntityType } from "../Constants/EntityType";
import { EntityManager } from "../Core/EntityManager";
import { EventKey, GameEvent } from "../Core/GameEvent";

export class BulletFactory {

    static spawnPlayerBullet(pos: Vec3, dir: Vec3): void {
        const node = PoolManager.spawn(PoolKey.BULLET_PLAYER);
        node.setPosition(pos);

        const authoring = node.getComponent(BulletAuthoring);
        authoring.init(EntityType.PLAYER_BULLET, dir, 500);

        EntityManager.add(authoring.getEntity());

        GameEvent.emit(EventKey.SHOOT);
    }

    static spawnEnemyBullet(pos: Vec3, dir: Vec3): void {
        const node = PoolManager.spawn(PoolKey.BULLET_ENEMY);
        node.setPosition(pos);

        const authoring = node.getComponent(BulletAuthoring);
        authoring.init(EntityType.ENEMY_BULLET, dir, 300);

        EntityManager.add(authoring.getEntity());

        GameEvent.emit(EventKey.ENEMY_SHOOT);
    }
}