import { _decorator, Component, Node, Prefab } from 'cc';
import { PoolManager } from './pool/PoolManager';
import { PoolKey } from '../Constants/PoolKey';
import { InputManager } from '../Input/InputManager';
import { InputSystem } from '../Systems/InputSystem';
import { MoveSystem } from '../Systems/MoveSystem';
import { EntityManager } from './EntityManager';
import { DashSystem } from '../Systems/DashSystem';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab) enemyBulletPrefab: Prefab = null;
    @property(Prefab) playerBulletPrefab: Prefab = null;
    @property(Prefab) enemyChaserPrefab: Prefab = null;
    @property(Prefab) enemyShooterPrefab: Prefab = null;

    @property(Node) enemyContainer: Node = null;
    @property(Node) bulletContainer: Node = null;

    start() {
        const inputManager = new InputManager();
        this.initPools();
    }

    update(deltaTime: number) {
        InputSystem.update();

        DashSystem.update(deltaTime);

        MoveSystem.update(deltaTime);

        EntityManager.cleanup();
    }

    private initPools(): void {

        // Enemy
        PoolManager.createPool(
            PoolKey.ENEMY_CHASER,
            this.enemyChaserPrefab,
            this.enemyContainer
        );

        PoolManager.createPool(
            PoolKey.ENEMY_SHOOTER,
            this.enemyShooterPrefab,
            this.enemyContainer
        );

        // Bullet
        PoolManager.createPool(
            PoolKey.BULLET_PLAYER,
            this.playerBulletPrefab,
            this.bulletContainer
        );

        PoolManager.createPool(
            PoolKey.BULLET_ENEMY,
            this.enemyBulletPrefab,
            this.bulletContainer
        );
    }
}


