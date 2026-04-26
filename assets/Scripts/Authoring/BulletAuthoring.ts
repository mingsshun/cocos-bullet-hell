import { _decorator, Color, Vec3 } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { ComponentKey } from '../Constants/ComponentKey';
import { MoveComponent } from '../Components/MoveComponent';
import { ColliderComponent } from '../Components/ColliderComponent';
import { EntityType } from '../Constants/EntityType';
import { DamageComponent } from '../Components/DamageComponent';
import { PoolKey } from '../Constants/PoolKey';
const { ccclass, property } = _decorator;

@ccclass('BulletAuthoring')
export class BulletAuthoring extends BaseAuthoring {
    @property moveSpeed: number = 100;

    protected override build(entity: Entity): void {
        entity.node = this.node;
        entity.addComponent(ComponentKey.MOVE, new MoveComponent());
        entity.addComponent(ComponentKey.COLLIDER, new ColliderComponent());
        entity.addComponent(ComponentKey.DAMAGE, new DamageComponent());
    }

    public override init(type: EntityType, dir: Vec3, speed: number): void {
         if (type === EntityType.PLAYER_BULLET) {
            this.sprite.color = new Color(80, 255, 80); // Green
        } else {
            this.sprite.color = new Color(255, 80, 80); // Red
        }

        this.entity.type = type;
        this.entity.poolKey = type === EntityType.PLAYER_BULLET ? PoolKey.BULLET_PLAYER : PoolKey.BULLET_ENEMY;

        const move = this.entity.getComponent(ComponentKey.MOVE);
        move.direction.set(dir).normalize();
        move.speed = speed;

        this.entity.isRelease = false;
        this.node.active = true;
    }
}


