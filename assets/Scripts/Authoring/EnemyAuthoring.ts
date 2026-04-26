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
import { GameConfig } from '../Config';
import { DamageComponent } from '../Components/DamageComponent';
const { ccclass, property } = _decorator;

@ccclass('EnemyAuthoring')
export class EnemyAuthoring extends BaseAuthoring {
    @property isChaser: boolean = false;
    @property hp: number = 50;
    @property moveSpeed: number = 100;
    @property radius: number = 25;

    protected override build(entity: Entity): void {
        entity.node = this.node;
        entity.type = EntityType.ENEMY;
        entity.poolKey = this.isChaser ? PoolKey.ENEMY_CHASER : PoolKey.ENEMY_SHOOTER;

        entity.addComponent(ComponentKey.HEALTH, new HealthComponent());
        entity.addComponent(ComponentKey.COLLIDER, new ColliderComponent());
        entity.addComponent(ComponentKey.DAMAGE, new DamageComponent());

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
        health.hp = this.isChaser ? GameConfig.enemy.chaser_hp : GameConfig.enemy.shooter_hp;

        const collider = this.entity.getComponent(ComponentKey.COLLIDER);
        collider.radius = this.radius;

        const damage = this.entity.getComponent(ComponentKey.DAMAGE);
        damage.value = GameConfig.enemy.contact_damage;

        if (this.isChaser) {
            const move = this.entity.getComponent(ComponentKey.MOVE);
            move.speed = GameConfig.enemy.chaser_speed;
            move.direction.set(0, 0, 0);
        }
        else{
            const shoot = this.entity.getComponent(ComponentKey.SHOOT);
            shoot.range = GameConfig.enemy_shooter.range;  
            shoot.cooldown = GameConfig.enemy_shooter.cooldown;
            shoot.timer = 0;
        }

        this.entity.isRelease = false;
        this.node.active = true;
    }
}


