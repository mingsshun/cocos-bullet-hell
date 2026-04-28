import { _decorator, Color, Component, Label, Sprite, tween, Tween } from 'cc';
import { GameConfig } from '../Config';
const { ccclass, property } = _decorator;

@ccclass('IngameUI')
export class IngameUI extends Component {
    @property(Label) timerLabel: Label = null;
    @property(Sprite) hpSprite: Sprite = null;
    @property(Label) hpLabel: Label = null;

    private blinkTween: Tween<Label> | null = null;

    updateTimer(time: number) {
        const t = Math.max(0, Math.ceil(time));
        this.timerLabel.string = "Survival: " + t;

        if (t > 30) {
            this.setColor(Color.GREEN);
            this.stopBlink();
        }
        else if (t > 10) {
            this.setColor(Color.YELLOW);
            this.stopBlink();
        }
        else {
            this.setColor(Color.RED);
            this.startBlink();
        }
    }

    updateHp(current: number) {
        this.hpSprite.fillStart = current / GameConfig.player.hp;
        this.hpLabel.string = "HP: " + current + "/" + GameConfig.player.hp;
    }

    private setColor(color: Color) {
        this.timerLabel.color = color;
    }

    private startBlink() {

        if (this.blinkTween) return;

        this.blinkTween = tween(this.timerLabel)
            .to(0.3, { color: new Color(255, 0, 0, 50) })
            .to(0.3, { color: Color.RED })
            .union()
            .repeatForever();

        this.blinkTween.start();
    }

    private stopBlink() {

        if (!this.blinkTween) return;

        this.blinkTween.stop();
        this.blinkTween = null;

        this.timerLabel.color = Color.WHITE;
    }
}


