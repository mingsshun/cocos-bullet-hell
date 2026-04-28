import { EventTarget } from 'cc';

export const GameEvent = new EventTarget();

export enum EventKey {
    SCREEN_SHAKE = 'SCREEN_SHAKE',
    SHOOT = 'SHOOT',
    ENEMY_SHOOT = 'ENEMY_SHOOT',
    HIT = 'HIT',
    ENEMY_DIE = 'ENEMY_DIE',
    GAME_OVER = 'GAME_OVER',
    BGM_PLAY = 'BGM_PLAY',
    BGM_STOP = 'BGM_STOP',
    DASH = 'DASH',
}