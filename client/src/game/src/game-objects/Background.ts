import { AbstractScene } from '../scenes/AbstractScene';

const BALLS_POSITIONS = {
	portrait: [
		{ x: -300, y: -550, angle: 15, scale: 1 },
		{ x: -200, y: 200, angle: -25, scale: 0.72 },
		{ x: 200, y: 560, angle: -10, scale: 0.69 },
		{ x: 300, y: -100, angle: 20, scale: 0.6 },
		{ x: 300, y: 400, angle: -5, scale: 0.9 },
	],
	landscape: [
		{ x: -650, y: -300, angle: 15, scale: 1 },
		{ x: -500, y: 200, angle: -25, scale: 0.72 },
		{ x: 400, y: -360, angle: -10, scale: 1 },
		{ x: 700, y: -100, angle: 20, scale: 0.6 },
		{ x: 300, y: 400, angle: -5, scale: 0.9 },
	],
};

export class Background {
	background!: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Image;
	backgroundCircles!: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Image;

	constructor(public scene: AbstractScene) {
		this.addGradientBackground();
		this.addBackgroundCircles();
	}

	private addBackgroundCircles() {
		this.backgroundCircles = this.scene.add.image(0, 0, 'bg_circles');
	}

	private addPlainBackground(): void {
		this.background = this.scene.add.rectangle(0, 0, 1, 1, 0x7131dd);
	}

	private addGradientBackground(): void {
		let { width, height } = this.scene.resizeDim;

		width /= this.scene.grs.dpr;
		height /= this.scene.grs.dpr;

		let canvasTexture;
		if (this.scene.textures.exists('backgroundTex')) {
			canvasTexture = this.scene.textures.get('backgroundTex') as Phaser.Textures.CanvasTexture;
		} else {
			canvasTexture = this.scene.textures.createCanvas('backgroundTex', width, height);
		}

		if (!canvasTexture) {
			this.addPlainBackground();
			return;
		}
		const context = canvasTexture.getContext();
		const gradient = context.createRadialGradient(
			width * 0.5,
			height * 0.5,
			0,
			width * 0.5,
			height * 0.5,
			height
		);
		gradient.addColorStop(0, '#B092E1');
		gradient.addColorStop(1, '#7131DD');
		context.fillStyle = gradient;
		context.fillRect(0, 0, width, height);

		// // Below is required only when running the game in WEBGL
		canvasTexture.refresh();

		this.background = this.scene.add.image(0, 0, 'backgroundTex');
		this.background.setOrigin(0.5);
	}

	resizeAndRepositionElements(w: number, h: number): void {
		const width = w / this.background.width;
		const height = h / this.background.height;
		this.background.setScale(width > height ? width : height);
		const ballPositions = this.scene.grs.isPortrait
			? BALLS_POSITIONS.portrait
			: BALLS_POSITIONS.landscape;
	}
}
