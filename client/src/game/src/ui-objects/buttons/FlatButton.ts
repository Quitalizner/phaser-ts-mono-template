import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from './AbstractButton';

export class FlatButton extends AbstractButton<Phaser.GameObjects.Image> {
	constructor(
		public scene: AbstractScene,
		x: number,
		y: number,
		textureKey = 'move_button',
		onClickEnable = false
	) {
		super(scene, x, y);
		this.addButton(textureKey);
		this.addTouchHandler(onClickEnable);
		this.handleHoverStates();
		this.scene.add.existing(this);
	}

	private addButton(textureKey: string): void {
		this.button = this.scene.add.image(0, 0, textureKey);
		this.add(this.button);
	}
}
