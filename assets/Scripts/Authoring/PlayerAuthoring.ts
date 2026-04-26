import { _decorator, sp } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { EntityType } from '../Constants/EntityType';
import { ComponentKey } from '../Constants/ComponentKey';
import { MoveComponent } from '../Components/MoveComponent';
import { InputSystem } from '../Systems/InputSystem';
import { DashComponent } from '../Components/DashComponent';
import { HealthComponent } from '../Components/HealthComponent';
import { ColliderComponent } from '../Components/ColliderComponent';
import { ShootComponent } from '../Components/ShootComponent';
const { ccclass, property } = _decorator;

@ccclass('PlayerAuthoring')
export class PlayerAuthoring extends BaseAuthoring {
    @property speed: number = 200;

    @property hp: number = 100;

    protected override build(entity: Entity): void {
        entity.type = EntityType.PLAYER;

        entity.addComponent(ComponentKey.MOVE, new MoveComponent());
        entity.addComponent(ComponentKey.INPUT, new InputSystem());
        entity.addComponent(ComponentKey.DASH, new DashComponent());
        entity.addComponent(ComponentKey.HEALTH, new HealthComponent());
        entity.addComponent(ComponentKey.COLLIDER, new ColliderComponent());
        entity.addComponent(ComponentKey.SHOOT, new ShootComponent());
    }

    public override init(...args: any[]): void {
        const move = this.entity.getComponent(ComponentKey.MOVE);
        move.speed = this.speed;
        move.direction.set(0, 0, 0);

        const health = this.entity.getComponent(ComponentKey.HEALTH);
        health.hp = this.hp;

        const shoot = this.entity.getComponent(ComponentKey.SHOOT);
        shoot.range = 250;
        shoot.cooldown = 0.3;
        shoot.timer = 0;

        this.entity.isRelease = false;
        this.node.active = true;
    }
}


