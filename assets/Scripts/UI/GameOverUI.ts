import { _decorator, Component, Label } from 'cc';
import { GameManager } from '../Core/GameManager';

const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    titleLabel: Label = null!;

    show(isWin: boolean) {

        this.node.active = true;

        this.titleLabel.string = isWin
            ? "YOU WIN"
            : "GAME OVER";
    }

    hide() {
        this.node.active = false;
    }

    onClickRestart() {
        GameManager.instance.restart();
    }
}