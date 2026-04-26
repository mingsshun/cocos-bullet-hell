import { _decorator, Node } from 'cc';
import { ComponentKey } from '../Constants/ComponentKey';
import { ComponentMap } from '../Constants/ComponentMap';
import { EntityType } from '../Constants/EntityType';
import { PoolKey } from '../Constants/PoolKey';
export class Entity {
    private components = new Map<ComponentKey, any>();

    public type: EntityType;
    public poolKey: PoolKey;
    public node: Node;
    public isRelease: boolean = false;

    public addComponent<K extends ComponentKey>(
        key: K,
        value: ComponentMap[K]): void {
        this.components.set(key, value);
    }

    public getComponent<K extends ComponentKey>(
        key: K): ComponentMap[K] {
        return this.components.get(key);
    }

    public hasComponent(key: ComponentKey): boolean {
        return this.components.has(key);
    }
}


