import { CAM_CENTER, DESIGN_RES } from '../cfg/constants/design-constants';
import { ResizerType } from '../cfg/constants/static-constants';
import { IDisplaySize } from '../cfg/interfaces/IDisplaySize';
import type { AbstractScene } from '../scenes/AbstractScene';
import { CameraResizer } from './CameraResizer';

export class GameResizer {
	game: Phaser.Game;

	gameDesignSize: IDisplaySize;
	gameResizeSize: Map<string, IDisplaySize>;

	private _camResizer: CameraResizer;

	isPortrait: boolean;
	resizerType: ResizerType = ResizerType.ZOOM_FIT;

	dpr = 0;

	constructor(game: Phaser.Game) {
		this.game = game;

		// Default: Landscape for the game. Change to portrait if the game is mainly designed in portrait
		const designRes = DESIGN_RES.landscape;

		this.gameDesignSize = {
			width: designRes.width,
			height: designRes.height,
			top: CAM_CENTER.y - designRes.height * 0.5,
			bottom: CAM_CENTER.y + designRes.height * 0.5,
			left: CAM_CENTER.x - designRes.width * 0.5,
			right: CAM_CENTER.x + designRes.width * 0.5,
		};

		if (this.game.device.os.desktop) {
			this.resizerType = ResizerType.ZOOM_FIT;
		} else {
			this.resizerType = ResizerType.ZOOM_FIT_DPR;
		}
		console.log('resize type', this.resizerType);

		this.gameResizeSize = new Map();

		this._camResizer = new CameraResizer(this.game, this.gameResizeSize);

		this.isPortrait = false;

		this.resize();
	}

	resize(): void {
		const w = window.innerWidth;
		const h = window.innerHeight;

		if (w <= h) {
			this.gameDesignSize.width = DESIGN_RES.portrait.width;
			this.gameDesignSize.height = DESIGN_RES.portrait.height;
		} else {
			this.gameDesignSize.width = DESIGN_RES.landscape.width;
			this.gameDesignSize.height = DESIGN_RES.landscape.height;
		}

		this.isPortrait = w <= h;

		if (this.resizerType === ResizerType.FIT) {
			this.preserveARWithEmptyRegions(w, h, this.gameDesignSize.width, this.gameDesignSize.height);
		} else if (this.resizerType === ResizerType.ZOOM_FIT) {
			this.dpr = 1;
			this._camResizer.preserveMainContentUsingZoom(w, h, this.dpr);
		} else if (this.resizerType === ResizerType.ZOOM_FIT_DPR) {
			this.setDpr();
			this._camResizer.preserveMainContentUsingZoom(w, h, this.dpr);
		}
	}

	private setDpr() {
		this.dpr = window.devicePixelRatio; // Sharp
		// if (this.dpr > 1) {
		// 	this.dpr = (this.dpr + 1) / 2; // Smooth: Also more performative
		// }
	}

	// Preserve the aspect ratio and fit to screen. Might add empty spaces to the sides of the canvas.
	private preserveARWithEmptyRegions(
		winWidth: number,
		winHeight: number,
		origWidth: number,
		origHeight: number
	): void {
		const scale = Math.min(winWidth / origWidth, winHeight / origHeight);

		const newWidth = origWidth * scale;
		const newHeight = origHeight * scale;

		// scale the width and height of the css
		this.game.scale.canvas.style.width = `${Math.round(newWidth)}px`;
		this.game.scale.canvas.style.height = `${Math.round(newHeight)}px`;

		// center the game with css absolute values
		this.game.scale.canvas.style.top = `${Math.round(winHeight - newHeight) / 2}px`;
		this.game.scale.canvas.style.left = `${Math.round((winWidth - newWidth) / 2)}px`;

		this.game.scale.emit('custom-resize');
	}

	private centerCameraWithoutZoomFit(scene: AbstractScene, zoomScale: number) {
		const { width, height } = this.game.scale.gameSize;
		scene.cameras.main.centerOn(CAM_CENTER.x, CAM_CENTER.y);

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

		gameResizeSize.width = width;
		gameResizeSize.height = height;
		gameResizeSize.top = CAM_CENTER.y - height * 0.5;
		gameResizeSize.bottom = CAM_CENTER.y + height * 0.5;
		gameResizeSize.left = CAM_CENTER.x - width * 0.5;
		gameResizeSize.right = CAM_CENTER.x + width * 0.5;
	}

	setCamera(scene: AbstractScene, zoomScale: number): void {
		if (this.resizerType === ResizerType.FIT) {
			this.centerCameraWithoutZoomFit(scene, zoomScale);
		} else if (this.resizerType === ResizerType.ZOOM_FIT) {
			this._camResizer.setCameraSizeAndZoom(scene, zoomScale);
		} else if (this.resizerType === ResizerType.ZOOM_FIT_DPR) {
			this._camResizer.setCameraSizeAndZoom(scene, zoomScale);
		}
	}
}
