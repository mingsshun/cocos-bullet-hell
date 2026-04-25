import { _decorator } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { EntityType } from '../Constants/EntityType';
import { ComponentKey } from '../Constants/ComponentKey';
import { MoveComponent } from '../Components/MoveComponent';
const { ccclass, property } = _decorator;

@ccclass('EnemyAuthoring')
export class EnemyAuthoring extends BaseAuthoring {
    @property isChaser: boolean = false;

    protected override build(entity: Entity): void {
        entity.type = EntityType.PLAYER;

        entity.addComponent(ComponentKey.MOVE, new MoveComponent());
    }
}


