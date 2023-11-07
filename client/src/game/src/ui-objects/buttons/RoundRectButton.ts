import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from './AbstractButton';

export class RoundRectButton extends AbstractButton<Phaser.GameObjects.Rectangle> {
	constructor(
		public scene: AbstractScene,
		x: number,
		y: number,
		buttonConfig: { w: number; h: number; r: number; color: number },
		onClickEnable = false
	) {
		super(scene, x, y);
		this.addButton(buttonConfig.w, buttonConfig.h, buttonConfig.r, buttonConfig.color);
		this.addTouchHandler(onClickEnable);
		this.handleHoverStates();
		this.scene.add.existing(this);
	}

	private addButton(w: number, h: number, r: number, color: number): void {
		this.button = this.scene.add
			// @ts-ignore: This is a plugin for rounded rectangle. Has no typings
			.rexRoundRectangle(0, 0, w, h, r, color);
		this.add(this.button);
	}
}
