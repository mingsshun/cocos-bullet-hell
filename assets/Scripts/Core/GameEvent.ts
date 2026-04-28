import { EventTarget } from 'cc';

export const GameEvent = new EventTarget();

export enum EventKey {
    SCREEN_SHAKE = 'SCREEN_SHAKE',
}