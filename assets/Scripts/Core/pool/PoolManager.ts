import { Node, Prefab } from 'cc';
import { ObjectPool } from './ObjectPool';
import { PoolKey } from '../../Constants/PoolKey';

export class PoolManager {

    private static pools = new Map<PoolKey, ObjectPool>();

    static createPool(key: PoolKey, prefab: Prefab, parent: Node): void {
        this.pools.set(key, new ObjectPool(prefab, parent));
    }

    static spawn(key: PoolKey): Node {
        return this.pools.get(key)!.get();
    }

    static release(key: PoolKey, node: Node): void {
        this.pools.get(key)!.release(node);
    }
}