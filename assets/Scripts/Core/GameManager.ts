import { _decorator, Component, Node, Prefab } from 'cc';
import { PoolManager } from './pool/PoolManager';
import { PoolKey } from '../Constants/PoolKey';
import { InputManager } from '../Input/InputManager';
import { InputSystem } from '../Systems/InputSystem';
import { MoveSystem } from '../Systems/MoveSystem';
import { EntityManager } from './EntityManager';
import { DashSystem } from '../Systems/DashSystem';
import { PlayerAuthoring } from '../Authoring/PlayerAuthoring';
import { SpawnSystem } from '../Systems/SpawnSystem';
import { CombatSystem } from '../Systems/CombatSystem';
import { AISystem } from '../Systems/AISystem';
import { CollisionSystem } from '../Systems/CollisionSystem';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab) bulletPrefab: Prefab = null;
    @property(Prefab) chaserEnemyPrefab: Prefab = null;
    @property(Prefab) shooterEnemyPrefab: Prefab = null;

    @property(Node) playerNode: Node = null;
    @property(Node) enemyContainer: Node = null;
    @property(Node) bulletContainer: Node = null;

    start() {
        const playerAuthoring = this.playerNode.getComponent(PlayerAuthoring);
        playerAuthoring.init();
        EntityManager.add(playerAuthoring.getEntity());
        //
        const inputManager = new InputManager();
        this.initPools();
    }

    update(deltaTime: number) {
        SpawnSystem.update(deltaTime);

        InputSystem.update();
        DashSystem.update(deltaTime);
        AISystem.update();

        MoveSystem.update(deltaTime);

        CombatSystem.update(deltaTime);
        CollisionSystem.update();

        EntityManager.cleanup();
    }

    private initPools(): void {

        // Enemy
        PoolManager.createPool(
            PoolKey.ENEMY_CHASER,
            this.chaserEnemyPrefab,
            this.enemyContainer
        );
        PoolManager.createPool(
            PoolKey.ENEMY_SHOOTER,
            this.shooterEnemyPrefab,
            this.enemyContainer
        );
        // Bullet
        PoolManager.createPool(
            PoolKey.BULLET_PLAYER,
            this.bulletPrefab,
            this.bulletContainer
        );
        PoolManager.createPool(
            PoolKey.BULLET_ENEMY,
            this.bulletPrefab,
            this.bulletContainer
        );
    }

    static gameOver(isWin: boolean) {
        console.log("isWin: " + isWin);
    }
}


