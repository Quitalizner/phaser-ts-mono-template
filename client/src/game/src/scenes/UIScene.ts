import { AudioManager } from '../core/AudioManager';
import { UIManager } from '../core/UIManager';
import { AbstractScene } from './AbstractScene';

export class UIScene extends AbstractScene {
	private uiManager!: UIManager;

	constructor() {
		super('ui');
	}

	init(): void {
		this.zoomScale = 1;
		super.init();
	}

	private createUIElements(): void {
		this.uiManager = new UIManager(this);
		this.audioManager = new AudioManager(this);
		this.audioManager.initUIAudio();

		this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
			if (this.game.scale.fullscreen.available && !this.game.scale.isFullscreen) {
				// eslint-disable-next-line no-undef
				if (process.env.NODE_ENV !== 'development') {
					// this.game.scale.startFullscreen();
				}
			}
		});

		// Debug performance
		// this.renderer.captureFrame(false, false);
	}

	create(): void {
		this.createUIElements();
		this.resizeAndRepositionElements();
	}

	resizeAndRepositionElements(): void {
		if (this.uiManager) {
			this.uiManager.resizeAndRepositionElements();
		}
	}
}
