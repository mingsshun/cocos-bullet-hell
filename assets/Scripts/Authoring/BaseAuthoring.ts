import { _decorator, Color, Component, Sprite, Tween, tween } from 'cc';
import { Entity } from '../Entity/Entity';
import { EntityManager } from '../Core/EntityManager';

const { ccclass, property } = _decorator;

@ccclass('BaseAuthoring')
export abstract class BaseAuthoring extends Component {
    @property(Sprite) sprite: Sprite = null;

    protected entity: Entity;
    private originalColor: Color;
    private flashTween: Tween<Sprite> | null = null;

    public getEntity(): Entity {
        return this.entity;
    }

    protected onLoad(): void {
        if (!this.entity) {
            this.entity = new Entity();
            this.entity.node = this.node;

            this.build(this.entity);

            this.originalColor = this.sprite.color.clone();
        }
    }

    protected abstract build(entity: Entity): void;

    public abstract init(...args: any[]): void;

    public playHitFlash(): void {

        if (!this.sprite) return;

        if (this.flashTween) {
            this.flashTween.stop();
            this.flashTween = null;
        }

        this.sprite.color = this.originalColor.clone();

        this.flashTween = tween(this.sprite)
            .to(0.05, { color: Color.WHITE })
            .to(0.1, { color: this.originalColor })
            .call(() => {
                this.flashTween = null;
            });

        this.flashTween.start();
    }
}