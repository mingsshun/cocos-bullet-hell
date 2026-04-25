import { Vec2 } from 'cc';

export interface IInputSource {
    getMoveDir(): Vec2;
    isDashPressed(): boolean;
}