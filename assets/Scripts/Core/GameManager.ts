import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab) enemyBulletPrefab: Prefab = null;
    @property(Prefab) playerBulletPrefab: Prefab = null;
    @property(Prefab) enemyChaserPrefab: Prefab = null;
    @property(Prefab) enemyShooterPrefab: Prefab = null;

    start() {

    }

    update(deltaTime: number) {

    }
}


