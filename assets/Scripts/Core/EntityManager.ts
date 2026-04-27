import { EntityType } from "../Constants/EntityType";
import { Entity } from "../Entity/Entity";
import { PoolManager } from "./pool/PoolManager";

export class EntityManager {
    static players: Entity[] = [];
    static enemies: Entity[] = [];
    static playerBullets: Entity[] = [];
    static enemyBullets: Entity[] = [];

    static all: Entity[] = [];

    static add(entity: Entity): void {
        this.all.push(entity);

        switch (entity.type) {
            case EntityType.PLAYER:
                this.players.push(entity);
                break;

            case EntityType.ENEMY:
                this.enemies.push(entity);
                break;

            case EntityType.PLAYER_BULLET:
                this.playerBullets.push(entity);
                break;

            case EntityType.ENEMY_BULLET:
                this.enemyBullets.push(entity);
                break;
        }
    }

    static release(entity: Entity): void {
        if (entity.isRelease) return;

        entity.isRelease = true;

        PoolManager.release(entity.poolKey, entity.node);
    }

    static cleanup(): void {
        this.players = this.players.filter(e => !e.isRelease);
        this.enemies = this.enemies.filter(e => !e.isRelease);
        this.playerBullets = this.playerBullets.filter(e => !e.isRelease);
        this.enemyBullets = this.enemyBullets.filter(e => !e.isRelease);

        this.all = this.all.filter(e => !e.isRelease);
    }

    static getPlayer(): Entity {
        return this.players.length > 0 ? this.players[0] : null;
    }

    static clearAll(): void {
        for (const e of this.all) {

            if (e.isRelease) continue;

            if (e.poolKey !== undefined) {
                PoolManager.release(e.poolKey, e.node);
            }
            // else {
            //     e.node.active = false;
            // }

            e.isRelease = true;
        }


        this.players.length = 0;
        this.enemies.length = 0;
        this.playerBullets.length = 0;
        this.enemyBullets.length = 0

        this.all.length = 0;
    }
}


