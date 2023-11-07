import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from './AbstractButton';

export class IconButton extends AbstractButton<Phaser.GameObjects.Image> {
	icon!: Phaser.GameObjects.Image;

	constructor(
		public scene: AbstractScene,
		x: number,
		y: number,
		iconImageKey = 'energy',
		baseImageKey = 'market_button_base',
		onClickEnable = false
	) {
		super(scene, x, y);
		this.addButton(baseImageKey);
		this.addIcon(iconImageKey);
		this.addTouchHandler(onClickEnable);
		this.handleHoverStates();
		this.scene.add.existing(this);
	}

	private addButton(textureKey: string): void {
		this.button = this.scene.add.image(0, 0, textureKey);
		this.add(this.button);
	}

	private addIcon(textureKey: string): void {
		this.icon = this.scene.add.image(0, 0, textureKey);
		this.add(this.icon);
	}

	scaleIcon(value: number) {
		this.icon.setScale(value);
	}

	setIconOffset(valueX: number, valueY: number) {
		this.icon.setPosition(this.button.displayWidth * valueX, this.button.displayHeight * valueY);
	}
}
