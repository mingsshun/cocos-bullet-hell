import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
import { EventKey, GameEvent } from './GameEvent';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioSource)
    sfxSource: AudioSource;

    @property(AudioSource)
    bgmSource: AudioSource;

    @property(AudioClip)
    bgmClip: AudioClip;

    @property(AudioClip)
    shootClip: AudioClip;

    @property(AudioClip)
    enemyShootClip: AudioClip;

    @property(AudioClip)
    hitClip: AudioClip;

    @property(AudioClip)
    enemyDieClip: AudioClip;

    @property(AudioClip)
    gameOverClip: AudioClip;

    @property(AudioClip)
    dashClip: AudioClip;

    private lastHitTime = 0;

    onLoad() {
        GameEvent.on(EventKey.SHOOT, this.onShoot, this);
        GameEvent.on(EventKey.ENEMY_SHOOT, this.onEnemyShoot, this);
        GameEvent.on(EventKey.HIT, this.onHit, this);
        GameEvent.on(EventKey.ENEMY_DIE, this.onEnemyDie, this);
        GameEvent.on(EventKey.GAME_OVER, this.onGameOver, this);
        GameEvent.on(EventKey.DASH, this.onDash, this);

        GameEvent.on(EventKey.BGM_PLAY, this.onPlayBGM, this);
    }

    protected onDestroy(): void {
        GameEvent.off(EventKey.SHOOT, this.onShoot, this);
        GameEvent.off(EventKey.ENEMY_SHOOT, this.onEnemyShoot, this);
        GameEvent.off(EventKey.HIT, this.onHit, this);
        GameEvent.off(EventKey.ENEMY_DIE, this.onEnemyDie, this);
        GameEvent.off(EventKey.GAME_OVER, this.onGameOver, this);
        GameEvent.off(EventKey.DASH, this.onDash, this);

        GameEvent.off(EventKey.BGM_PLAY, this.onPlayBGM, this);
    }

    private onShoot() {
        this.playSfx(this.shootClip, 0.3);
    }

    private onEnemyShoot() {
        this.playSfx(this.enemyShootClip, 0.3);
    }

    private onHit() {
        const now = performance.now();
        if (now - this.lastHitTime < 50) return;

        this.lastHitTime = now;

        this.playSfx(this.hitClip, 0.5);
    }

    private onEnemyDie() {
        this.playSfx(this.enemyDieClip, 0.7);
    }

    private onGameOver() {
        this.playSfx(this.gameOverClip, 1.0);

        this.onStopBGM();
    }

    private onDash() {
        this.playSfx(this.dashClip, 1.0);
    }

    private playSfx(clip: AudioClip, volume = 1) {

        if (!clip || !this.sfxSource) return;

        this.sfxSource.volume = volume;

        this.sfxSource.playOneShot(clip);
    }

    private onPlayBGM(loop = true) {

        if (!this.bgmClip || !this.bgmSource) return;

        this.bgmSource.clip = this.bgmClip;
        this.bgmSource.loop = loop;
        this.bgmSource.volume = 0.5;

        this.bgmSource.play();
    }

    private onStopBGM() {
        this.bgmSource?.stop();
    }
}


