import { CUSTOM_EVENTS } from '../../cfg/constants/game-constants';
import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { IPosition } from '../../cfg/interfaces/IPosition';
import { AbstractScene } from '../../scenes/AbstractScene';

export abstract class AbstractButton<T extends Phaser.GameObjects.GameObject> extends Phaser
	.GameObjects.Container {
	button!: T;
	clickTween: Phaser.Tweens.Tween | null = null;
	isInteractable = true;
	origPosition: IPosition;
	origScale = 1;

	constructor(public scene: AbstractScene, x: number, y: number) {
		super(scene, x, y);
		this.origPosition = { x, y };
		this.scene.add.existing(this);
	}

	protected addTouchHandler(onClickEnable = true): void {
		this.button.setInteractive();
		this.button.on(Phaser.Input.Events.POINTER_DOWN, () => {
			if (!this.isInteractable) {
				return;
			}
			this.isInteractable = false;
			this.handleOnClick(onClickEnable);
			this.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
		});
	}

	private handleOnClick(onClickEnable: boolean): void {
		this.clickTween = this.scene.add.tween({
			targets: this,
			scale: { to: this.origScale * 0.95, from: this.origScale },
			yoyo: true,
			ease: TWEEN_EASING.SINE_EASE_IN,
			duration: 50,
			onComplete: () => {
				this.setScale(this.origScale);
				if (onClickEnable) {
					this.isInteractable = true;
				}
			},
		});
	}

	protected handleHoverStates(): void {
		this.button.on(Phaser.Input.Events.POINTER_OVER, () => {
			if (!this.isInteractable) {
				return;
			}
			this.handleOnHover();
		});
		this.button.on(Phaser.Input.Events.POINTER_OUT, () => {
			if (!this.isInteractable) {
				return;
			}
			this.handleOnHoverOut();
		});
	}

	private handleOnHover(): void {
		this.scale = this.origScale * 1.025;
	}

	private handleOnHoverOut(): void {
		this.scale = this.origScale * 1;
	}

	setInteractable(value: boolean): void {
		this.isInteractable = value;
	}

	setPosition(x?: number, y?: number, z?: number, w?: number): this {
		super.setPosition(x, y, z, w);
		this.origPosition = { x: this.x, y: this.y };
		return this;
	}

	setScale(x: number, y?: number): this {
		super.setScale(x, y);
		this.origScale = x;
		return this;
	}
}
