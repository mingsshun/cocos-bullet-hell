import { _decorator, Color } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { EntityType } from '../Constants/EntityType';
import { ComponentKey } from '../Constants/ComponentKey';
import { MoveComponent } from '../Components/MoveComponent';
import { PoolKey } from '../Constants/PoolKey';
import { HealthComponent } from '../Components/HealthComponent';
import { ColliderComponent } from '../Components/ColliderComponent';
import { ShootComponent } from '../Components/ShootComponent';
import { AIComponent, AIType } from '../Components/AIComponent';
const { ccclass, property } = _decorator;

@ccclass('EnemyAuthoring')
export class EnemyAuthoring extends BaseAuthoring {
    @property isChaser: boolean = false;
    @property hp: number = 50;
    @property moveSpeed: number = 100;

    protected override build(entity: Entity): void {
        entity.node = this.node;
        entity.type = EntityType.ENEMY;
        entity.poolKey = this.isChaser ? PoolKey.ENEMY_CHASER : PoolKey.ENEMY_SHOOTER;

        entity.addComponent(ComponentKey.HEALTH, new HealthComponent());
        entity.addComponent(ComponentKey.COLLIDER, new ColliderComponent());

        if (this.isChaser) {
            entity.addComponent(ComponentKey.MOVE, new MoveComponent());
            entity.addComponent(ComponentKey.AI, {
                type: AIType.CHASER,
                cooldown: 0
            });
        } else {
            entity.addComponent(ComponentKey.SHOOT, new ShootComponent());
        }
    }

    public override init(...args: any[]): void {
        const health = this.entity.getComponent(ComponentKey.HEALTH);
        health.hp = this.hp;

        if (this.isChaser) {
            const move = this.entity.getComponent(ComponentKey.MOVE);
            move.speed = this.moveSpeed;
            move.direction.set(0, 0, 0);
        }
        else{
            const shoot = this.entity.getComponent(ComponentKey.SHOOT);
            shoot.range = 400;  
            shoot.cooldown = 1.5;
            shoot.timer = 0;
        }

        this.entity.isRelease = false;
        this.node.active = true;
    }
}


