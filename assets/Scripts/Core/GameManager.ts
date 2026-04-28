import { _decorator, Component, Node, Prefab } from 'cc';
import { PlayerAuthoring } from '../Authoring/PlayerAuthoring';
import { PoolKey } from '../Constants/PoolKey';
import { InputManager } from '../Input/InputManager';
import { AISystem } from '../Systems/AISystem';
import { CollisionSystem } from '../Systems/CollisionSystem';
import { CombatSystem } from '../Systems/CombatSystem';
import { DashSystem } from '../Systems/DashSystem';
import { InputSystem } from '../Systems/InputSystem';
import { MoveSystem } from '../Systems/MoveSystem';
import { SpawnSystem } from '../Systems/SpawnSystem';
import { GameOverUI } from '../UI/GameOverUI';
import { EntityManager } from './EntityManager';
import { PoolManager } from './pool/PoolManager';
import { GameConfig } from '../Config';
import { IngameUI } from '../UI/IngameUI';
const { ccclass, property } = _decorator;

export enum GameState {
    PLAYING,
    GAME_OVER
}

@ccclass('GameManager')
export class GameManager extends Component {
    static instance: GameManager;
    state: GameState = GameState.PLAYING;

    @property(Prefab) bulletPrefab: Prefab = null;
    @property(Prefab) chaserEnemyPrefab: Prefab = null;
    @property(Prefab) shooterEnemyPrefab: Prefab = null;

    @property(Node) playerNode: Node = null;
    @property(Node) enemyContainer: Node = null;
    @property(Node) bulletContainer: Node = null;

    @property(GameOverUI) gameOverUI: GameOverUI = null;
    @property(IngameUI) ingameUI: IngameUI = null;

    private time = GameConfig.game_duration;
    private duration = GameConfig.game_duration;

    protected onLoad(): void {
        GameManager.instance = this;
    }

    start() {
        this.initPlayer();
        //
        new InputManager();
        this.initPools();

        this.gameOverUI.hide();
    }

    update(deltaTime: number) {
        if (this.state !== GameState.PLAYING) return;

        this.time -= deltaTime;

        this.ingameUI.updateTimer(this.time);

        if (this.time <= 0) {
            GameManager.gameOver(true);
            return;
        }

        // SYSTEM
        SpawnSystem.update(deltaTime);

        InputSystem.update();
        DashSystem.update(deltaTime);
        AISystem.update();

        MoveSystem.update(deltaTime);

        CombatSystem.update(deltaTime);
        CollisionSystem.update();

        EntityManager.cleanup();
    }

    private initPlayer() {
        const authoring = this.playerNode.getComponent(PlayerAuthoring);
        authoring.init();

        EntityManager.add(authoring.getEntity());
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
        if (this.instance.state === GameState.GAME_OVER) return;

        this.instance.state = GameState.GAME_OVER;

        this.instance.playerNode.active = false;
        this.instance.gameOverUI.show(isWin);
    }

    static updateHp(current: number): void {
        this.instance.ingameUI.updateHp(current);
    }

    restart() {

        this.state = GameState.PLAYING;

        this.time = this.duration;

        EntityManager.clearAll();

        SpawnSystem.reset();

        this.playerNode.active = true;
        this.initPlayer();

        this.gameOverUI.hide();
    }

    getTime(): number {
        return this.time;
    }
}


