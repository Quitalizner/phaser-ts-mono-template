import { AudioManager } from '../core/AudioManager';
import { GameManager } from '../core/GameManager';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
	private gameManager!: GameManager;

	constructor() {
		super('game');
	}

	init(): void {
		this.zoomScale = 1;
		super.init();
	}

	preload() {
		this.scene.launch('ui');
	}

	private createGameElements(): void {
		this.audioManager = new AudioManager(this);
		this.audioManager.initGameAudio();
		this.gameManager = new GameManager(this);
	}

	create(): void {
		this.createGameElements();
		this.resizeAndRepositionElements();
	}

	resizeAndRepositionElements(): void {
		let { width: w, height: h } = this.resizeDim;
		w /= this.grs.dpr;
		h /= this.grs.dpr;
		if (this.gameManager) {
			this.gameManager.resizeAndRepositionElements(w, h);
		}
	}

	update(time: number, delta: number): void {
		this.gameManager.update(delta);
	}
}
