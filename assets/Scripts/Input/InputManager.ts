import { Vec2 } from 'cc';
import { DesktopInput } from './DesktopInput';

export class InputManager {

    private static _instance: InputManager;

    static get instance() {
        return this._instance;
    }

    private source: DesktopInput;

    constructor() {
        InputManager._instance = this;

        this.source = new DesktopInput();
    }

    getMoveDir(): Vec2 {
        const result = this.source.getMoveDir();

        if (result.lengthSqr() > 0) {
            result.normalize();
        }

        return result;
    }

    isDashPressed(): boolean {
        return this.source.isDashPressed();
    }
}