import { CAM_CENTER, DESIGN_RES, MAX_RES } from '../cfg/constants/design-constants';
import { IDisplaySize } from '../cfg/interfaces/IDisplaySize';
import type { AbstractScene } from '../scenes/AbstractScene';

export class CameraResizer {
	dpr: number;
	constructor(private game: Phaser.Game, private gameResizeSize: Map<string, IDisplaySize>) {
		this.dpr = 1;
	}

	// Preserve the main content specified within the bounds of DESIGN_RES using DPR. Uses camera zoom to add black borders in the canvas.
	preserveMainContentUsingZoom(winWidth: number, winHeight: number, dpr = 1): void {
		this.dpr = dpr;
		// set canvas parent dom size to that of window size
		const widthDPR = Math.round(winWidth * this.dpr);
		const heightDPR = Math.round(winHeight * this.dpr);
		this.game.scale.parent.width = Math.round(winWidth);
		this.game.scale.parent.height = Math.round(winHeight);

		// Set canvas(dom) size attributes to that of window size * dpr
		// Note these are logical canvas dimensions that is considered in the game to draw the elements.
		// By using dpr on higher dpr screen we create a bigger canvas and zoom out to have clarity.
		// Can be memory intensive, hence the dpr has to be further optimized at later stages
		this.game.scale.canvas.width = widthDPR;
		this.game.scale.canvas.height = heightDPR;

		// Set canvas style size attributes same as window size
		// Note the styling acts as though the entire canvas is an image,
		// and scales the canvas up and down based on the dimensions provided.
		// Hence the canvas actually takes up the window dimensions specified.
		this.game.scale.canvas.style.width = `${winWidth}px`;
		this.game.scale.canvas.style.height = `${winHeight}px`;

		// In simple words
		// Canvas dom attributes acts as an image resolution opened in a device screen.
		// Canvas style attributes specify the device screen resolution.
		// Imagine a 540x960 image opened in a 1080x1920 device screen will be scaled up hence clarity loss.
		// Imagine a 2160x3840 image opened in a 1080x1920 device screen will be scaled down, since aspect ratio is the same, no loss of clarity, but memory consumption will be more.

		this.game.scale.setGameSize(widthDPR, heightDPR);
		this.game.scale.setParentSize(winWidth, winHeight);

		this.game.scale.emit('custom-resize');
		// this.game.scale.resize(winWidth, winHeight);
	}

	setCameraSizeAndZoom(scene: AbstractScene, zoomScale: number): void {
		const { width, height } = this.game.scale.gameSize;
		scene.cameras.main.setSize(width, height);
		let zoom = this.getZoom();

		// To avoid UI scaling down as the width of the screen increases in landscape mode
		if (
			scene.scene.key === 'game' &&
			this.game.scale.gameSize.width <= this.game.scale.gameSize.height
		) {
			zoom *= 1.45;
		}

		scene.cameras.main.setZoom(zoom * zoomScale * this.dpr);
		scene.cameras.main.centerOn(CAM_CENTER.x, CAM_CENTER.y);

		// To take zoom into account about the screen size.
		// Without this there will be black edges if we directly take width and height
		const zoomWidth = width / zoom;
		const zoomHeight = height / zoom;

		if (!this.gameResizeSize.has(scene.scene.key)) {
			this.gameResizeSize.set(scene.scene.key, {
				width: 0,
				height: 0,
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			});
		}

		const gameResizeSize = this.gameResizeSize.get(scene.scene.key)!;

		gameResizeSize.width = zoomWidth;
		gameResizeSize.height = zoomHeight;
		gameResizeSize.top = CAM_CENTER.y - zoomHeight * 0.5;
		gameResizeSize.bottom = CAM_CENTER.y + zoomHeight * 0.5;
		gameResizeSize.left = CAM_CENTER.x - zoomWidth * 0.5;
		gameResizeSize.right = CAM_CENTER.x + zoomWidth * 0.5;
	}

	private calculateZoomFormula(width: number, height: number): number {
		let zoomX = 1;
		if (this.game.scale.gameSize.width < width * this.dpr) {
			zoomX = this.game.scale.gameSize.width / (width * this.dpr);
		}
		let zoomY = 1;
		if (this.game.scale.gameSize.height < height * this.dpr) {
			zoomY = this.game.scale.gameSize.height / (height * this.dpr);
		}
		return Math.min(zoomX, zoomY);
	}

	private getDesignRes(): { width: number; height: number } {
		let designRes;
		if (this.game.scale.gameSize.width <= this.game.scale.gameSize.height) {
			designRes = DESIGN_RES.portrait;
		} else {
			designRes = DESIGN_RES.landscape;
		}
		return designRes;
	}

	private getZoom(): number {
		if (
			this.game.scale.gameSize.width > MAX_RES.width * this.dpr &&
			this.game.scale.gameSize.height > MAX_RES.height * this.dpr
		) {
			const zoomX = this.game.scale.gameSize.width / (MAX_RES.width * this.dpr);
			const zoomY = this.game.scale.gameSize.height / (MAX_RES.height * this.dpr);
			return Math.min(zoomX, zoomY);
		}
		const designRes = this.getDesignRes();

		return this.calculateZoomFormula(designRes.width, designRes.height);
	}
}
