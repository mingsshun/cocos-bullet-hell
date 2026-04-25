import { _decorator } from 'cc';
import { Entity } from '../Entity/Entity';
import { BaseAuthoring } from './BaseAuthoring';
import { EntityType } from '../Constants/EntityType';
const { ccclass, property } = _decorator;

@ccclass('PlayerAuthoring')
export class PlayerAuthoring extends BaseAuthoring {
    @property speed: number = 200;

    @property hp: number = 100;

    protected override build(entity: Entity): void {
        entity.type = EntityType.PLAYER;
    }
}


