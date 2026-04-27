import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { GameConfig } from '../Config';
const { ccclass, property } = _decorator;

@ccclass('IngameUI')
export class IngameUI extends Component {
    @property(Label) timerLabel: Label = null;
    @property(Sprite) hpSprite: Sprite = null;

    updateTimer(time: number) {
        const t = Math.max(0, Math.ceil(time));
        this.timerLabel.string = `Time: ${t}`;
    }

    updateHp(current: number) {
        this.hpSprite.fillStart = current / GameConfig.player.hp;
    }
}


