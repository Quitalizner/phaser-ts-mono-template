import { MultiplayerServer } from '../../../multiplayer/MultiplayerServer';
import { IDisplaySize } from '../cfg/interfaces/IDisplaySize';
import { AudioManager } from '../core/AudioManager';
import type { GameResizer } from '../utils/GameResizer';

export abstract class AbstractScene extends Phaser.Scene {
	globalEvents!: Phaser.Events.EventEmitter;
	grs!: GameResizer;
	audioManager!: AudioManager;
	server!: MultiplayerServer;

	zoomScale = 1;

	abstract resizeAndRepositionElements(): void;

	// gets called on each scene init automatically
	init(): void {
		this.grs.setCamera(this, this.zoomScale);
	}

	/** The dimensions of entire display area */
	get resizeDim(): IDisplaySize {
		return { ...this.grs.gameResizeSize.get(this.scene.key)! };
	}

	/** The dimensions of the design area (SAFE AREA) */
	get designDim(): IDisplaySize {
		return { ...this.grs.gameDesignSize };
	}

	attachHandlers(): void {
		this.handleResize();
		this.attachErrorHandlers();
	}

	turnOffResizeHandler(): void {
		this.game.scale.off('custom-resize', this.resizeHandler, this);
	}

	private resizeHandler(): void {
		this.grs.setCamera(this, this.zoomScale);
		this.resizeAndRepositionElements();
	}

	private handleResize(): void {
		this.game.scale.on('custom-resize', this.resizeHandler, this);
	}

	private attachErrorHandlers(): void {
		this.load.once('loaderror', () => {
			this.load.reset();
			this.load.removeAllListeners();
			alert('file load error');
		});
	}
}
