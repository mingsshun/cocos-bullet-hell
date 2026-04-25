import { input, Input, EventKeyboard, KeyCode, Vec2 } from 'cc';
import { IInputSource } from './IInputSource';

export class DesktopInput implements IInputSource {

    private dir = new Vec2();
    private dash = false;

    constructor() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(e: EventKeyboard): void {
        switch (e.keyCode) {
            case KeyCode.KEY_W: this.dir.y = 1; break;
            case KeyCode.KEY_S: this.dir.y = -1; break;
            case KeyCode.KEY_A: this.dir.x = -1; break;
            case KeyCode.KEY_D: this.dir.x = 1; break;

            case KeyCode.SPACE:
                this.dash = true;
                break;
        }
    }

    private onKeyUp(e: EventKeyboard): void {
        switch (e.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
                this.dir.y = 0;
                break;

            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.dir.x = 0;
                break;

            case KeyCode.SPACE:
                this.dash = false;
                break;
        }
    }

    public getMoveDir(): Vec2 {
        return this.dir.clone();
    }

    public isDashPressed(): boolean {
        return this.dash;
    }
}