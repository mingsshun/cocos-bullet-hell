import { Node, Prefab, instantiate } from 'cc';

export class ObjectPool {
    private pool: Node[] = [];

    constructor(
        private prefab: Prefab,
        private parent: Node
    ) { }

    public get(): Node {
        if (this.pool.length > 0) {
            const node = this.pool.pop()!;
            node.active = true;
            return node;
        }

        const node = instantiate(this.prefab);
        node.setParent(this.parent);
        return node;
    }

    public release(node: Node): void {
        node.active = false;
        this.pool.push(node);
    }
}