import { _decorator, Component, Sprite } from 'cc';
import { Entity } from '../Entity/Entity';
import { EntityManager } from '../Core/EntityManager';

const { ccclass, property } = _decorator;

@ccclass('BaseAuthoring')
export abstract class BaseAuthoring extends Component {
    @property(Sprite) sprite: Sprite = null;
    
    protected entity: Entity;

    public getEntity(): Entity {
        return this.entity;
    }

    protected onLoad(): void {
        if (!this.entity) {
            this.entity = new Entity();
            this.entity.node = this.node;

            this.build(this.entity);
        }
    }

    protected abstract build(entity: Entity): void;

    public abstract init(...args: any[]): void;
}