import { SERVER_EVENTS } from '../cfg/constants/game-constants';
import { GLOBAL_EVENTS } from '../cfg/constants/global-events';
import { GameComponents } from '../game-objects/GameComponents';
import { AbstractScene } from '../scenes/AbstractScene';

export class GameManager {
	gameComponents: GameComponents;

	constructor(public scene: AbstractScene) {
		this.gameComponents = new GameComponents(this.scene);
		this.addServerEventHandlers();
		this.addGlobalEventHandlers();
	}

	private addServerEventHandlers() {
		this.scene.server.gameEvents.on(
			SERVER_EVENTS.NEXT_NUMBER,
			(data: { nextCalledNumber: number; ended: boolean } | false) => {
				// console.warn('next number', data);
			}
		);
	}

	private addGlobalEventHandlers() {
		this.scene.globalEvents
			.on(GLOBAL_EVENTS.DISABLE_INPUT, () => {
				this.scene.input.enabled = false;
			})
			.on(GLOBAL_EVENTS.ENABLE_INPUT, () => {
				this.scene.input.enabled = true;
			})
			.on(GLOBAL_EVENTS.SETUP_GAME, () => {
				// this.gameComponents.setupGame(this.scene.server.getCells());
			})
			.on(GLOBAL_EVENTS.START_GAME, () => {
				this.gameComponents.startGame();
			})
			.on(GLOBAL_EVENTS.END_GAME, () => {
				this.gameComponents.endGame();
			});
	}

	private cleanUp() {
		this.gameCleanUp();
	}

	private gameCleanUp() {
		this.gameComponents.gameCleanUp();
	}

	resizeAndRepositionElements(w: number, h: number): void {
		this.gameComponents.resizeAndRepositionElements(w, h);
	}

	update(delta: number) {
		this.gameComponents.update(delta);
	}
}
