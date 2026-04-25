import { _decorator, Component } from 'cc';
import { Entity } from '../Entity/Entity';
import { EntityManager } from '../Core/EntityManager';

const { ccclass } = _decorator;

@ccclass('BaseAuthoring')
export abstract class BaseAuthoring extends Component {

    protected entity: Entity;

    start() {
        this.entity = new Entity();
        this.entity.node = this.node;

        this.build(this.entity);

        EntityManager.add(this.entity);
    }

    protected abstract build(entity: Entity): void;
}