import { AbstractScene } from '../scenes/AbstractScene';
import { Background } from './Background';

export class GameComponents {
	background: Background;

	isGameRunning = false;
	currentHitTimerEnded = true;

	constructor(public scene: AbstractScene) {
		this.background = new Background(this.scene);

		this.addEventHandlers();
	}

	private addEventHandlers() {
		const server = this.scene.server;
	}

	setupGame(cells: number[]) {}

	startGame() {
		this.isGameRunning = true;
	}

	endGame() {
		this.isGameRunning = false;
	}

	gameCleanUp() {
		//
	}

	resizeAndRepositionElements(w: number, h: number): void {
		this.background.resizeAndRepositionElements(w, h);
	}

	update(delta: number) {}
}
