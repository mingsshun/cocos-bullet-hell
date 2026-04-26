import { EntityType } from "../Constants/EntityType";
import { Entity } from "../Entity/Entity";

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
        entity.isRelease = true;
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
        this.players.length = 0;
        this.enemies.length = 0;
        this.playerBullets.length = 0;
        this.enemyBullets.length = 0

        this.all.length = 0;
    }
}


