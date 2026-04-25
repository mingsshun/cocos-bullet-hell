import { _decorator, sp } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { EntityType } from '../Constants/EntityType';
import { ComponentKey } from '../Constants/ComponentKey';
import { MoveComponent } from '../Components/MoveComponent';
import { InputSystem } from '../Systems/InputSystem';
import { DashComponent } from '../Components/DashComponent';
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

        const move = entity.getComponent(ComponentKey.MOVE);
        move.speed = this.speed;
    }
}


