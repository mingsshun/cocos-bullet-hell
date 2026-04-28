import { _decorator, Component, Vec3, Node, tween, Tween, EventTarget } from 'cc';
import { EventKey, GameEvent } from '../Core/GameEvent';
const { ccclass } = _decorator;

@ccclass('ScreenShake')
export class ScreenShake extends Component {

    private originalPos: Vec3 = new Vec3();
    private shakeTween: Tween<Node> | null = null;

    private eventTarget: EventTarget = new EventTarget();

    onLoad() {
        this.originalPos = this.node.position.clone();

        GameEvent.on(EventKey.SCREEN_SHAKE, this.onShake, this);
    }

    protected onDestroy(): void {
        GameEvent.off(EventKey.SCREEN_SHAKE, this.onShake, this);
    }

    private onShake(data: { intensity: number; duration: number }) {
        this.shake(data.intensity, data.duration);
    }

    shake(intensity = 10, duration = 0.2) {

        if (this.shakeTween) {
            this.shakeTween.stop();
            this.shakeTween = null;
        }

        const steps = Math.floor(duration / 0.02);

        let seq = tween(this.node);

        for (let i = 0; i < steps; i++) {

            const offset = new Vec3(
                (Math.random() - 0.5) * intensity,
                (Math.random() - 0.5) * intensity,
                0
            );

            seq = seq.to(0.02, {
                position: this.originalPos.clone().add(offset)
            });
        }

        seq = seq.to(0.05, { position: this.originalPos });

        this.shakeTween = seq;
        this.shakeTween.start();
    }
}