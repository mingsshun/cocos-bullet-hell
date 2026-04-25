import { EntityType } from "../Constants/EntityType";
import { Entity } from "../Entity/Entity";

export class EntityManager {
    static players: Entity[] = [];
    static enemies: Entity[] = [];
    static playerBullets: Entity[] = [];
    static enemyBullets: Entity[] = [];

    static add(entity: Entity) {

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
}


