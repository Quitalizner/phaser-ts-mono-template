import { CUSTOM_EVENTS, SERVER_EVENTS } from '../cfg/constants/game-constants';
import { GLOBAL_EVENTS } from '../cfg/constants/global-events';
import { UI_EVENTS } from '../cfg/constants/ui-constants';
import { WEB_VIEW_EVENTS } from '../cfg/constants/web-view-events';
import { EFeedback } from '../cfg/enums/EFeedback';
import { EGameState } from '../cfg/enums/EGameState';
import { AbstractScene } from '../scenes/AbstractScene';

const RETRY_TIME_MS = 250;

export class UIManager {
	currentState: EGameState = EGameState.MATCH_SCREEN;
	isGameStarted = false;

	constructor(public scene: AbstractScene) {
		this.scene = scene;

		// this.matchScreen.hide();
		// this.scoreBreakup.show({ perfect: 2, good: 4, correct: 6, bingo: 9, score: 1050, wrong: 3 });
		this.addEventHandlers();
		this.addGlobalEventHandlers();
		this.addServerEventHandlers();
	}

	private addEventHandlers() {
		const server = this.scene.server;
		// this.timerUI.on(UI_EVENTS.TIMER_END, () => {
		// 	// this.scene.globalEvents.emit(GLOBAL_EVENTS.END_GAME);
		// });
		// this.scoreBreakup.continueButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
		// 	// @ts-ignore Called from within react native
		// 	this.scoreBreakup.hide();
		// 	this.endScreen.show();
		// });
		// this.endScreen.continueButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
		// 	// @ts-ignore Called from within react native
		// 	const reactNativeWebView = window.ReactNativeWebView;
		// 	if (reactNativeWebView) {
		// 		reactNativeWebView.postMessage(WEB_VIEW_EVENTS.CLOSE_GAME);
		// 	}
		// });
		// this.matchScreen.goBackButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
		// 	// @ts-ignore Called from within react native
		// 	const reactNativeWebView = window.ReactNativeWebView;
		// 	if (reactNativeWebView) {
		// 		reactNativeWebView.postMessage(WEB_VIEW_EVENTS.CLOSE_GAME);
		// 	}
		// });
		// this.scene.game.events.on(Phaser.Core.Events.VISIBLE, () => {
		// 	this.timerUI.tabSwitchedVisible(server.isGameRunning);
		// });
		// this.scene.game.events.on(Phaser.Core.Events.HIDDEN, () => {
		// 	this.timerUI.tabSwitchedHidden(server.isGameRunning);
		// });
	}

	private addGlobalEventHandlers() {
		// this.scene.globalEvents
		// 	.on(GLOBAL_EVENTS.SHOW_FEEDBACK, (feedbackType: EFeedback, points: number) => {
		// 		this.feedback.showFeedback(feedbackType);
		// 		// this.scoreUI.addPoints(points);
		// 	})
		// 	.on(GLOBAL_EVENTS.END_GAME, () => {
		// 		// this.overlay.transitionShow();
		// 		this.handleResults();
		// 	});
	}

	private addServerEventHandlers() {
		// this.scene.server.gameEvents
		// 	.on(SERVER_EVENTS.MARK_CELL, (data: { score: number } | null) => {
		// 		if (data) {
		// 			this.scoreUI.addPoints(Math.round(data.score));
		// 			this.playerUI.updateScore(Math.round(data.score));
		// 		}
		// 	})
		// 	.on(SERVER_EVENTS.MAKE_BINGO, (data: { score: number } | null) => {
		// 		if (data) {
		// 			this.scoreUI.addPoints(Math.round(data.score));
		// 			this.playerUI.updateScore(Math.round(data.score));
		// 		}
		// 	})
		// 	.on(SERVER_EVENTS.OPPONENT_SCORE, (score: number) => {
		// 		this.opponentUI.updateScore(Math.round(score));
		// 	});
	}

	private handleNextStateCommon(nextState: EGameState) {
		switch (nextState) {
			case EGameState.GAME:
				break;
			// Show popup overlay for all states except the above
			default:
			// this.popupOverlay.show();
		}
	}

	private handlePreviousStateCommon(currentState: EGameState) {
		switch (currentState) {
			case EGameState.GAME:
				break;
			// hide popup overlay for all states except the above
			default:
			// this.popupOverlay.hide();
		}
	}

	changeState(nextState: EGameState) {
		// Previous Stata
		switch (this.currentState) {
			case EGameState.MATCH_SCREEN:
				// this.matchScreen.hide();
				break;
			case EGameState.GAME:
				break;
			case EGameState.END:
				break;
		}
		this.handlePreviousStateCommon(this.currentState);
		this.handleNextStateCommon(nextState);
		switch (nextState) {
			case EGameState.GAME:
				this.scene.globalEvents.emit(GLOBAL_EVENTS.SETUP_GAME);
				break;
			case EGameState.END:
				console.warn('end transition');
				// this.scoreBreakup.show(this.scene.server.getBreakupData());
				break;
		}
		this.currentState = nextState;
		this.resizeAndRepositionElements();
	}

	resizeAndRepositionElements(): void {
		let { width: w, height: h } = this.scene.resizeDim;
		w /= this.scene.grs.dpr;
		h /= this.scene.grs.dpr;

		// this.overlay.resizeAndRepositionElements(w, h);
		// this.playerUI.resizeAndRepositionElements(w, h);
		// this.opponentUI.resizeAndRepositionElements(w, h);

		// switch (this.currentState) {
		// 	case EGameState.MATCH_SCREEN:
		// 		this.matchScreen.resizeAndRepositionElements(w, h);
		// 		break;
		// 	case EGameState.GAME:
		// 		this.feedback.resizeAndRepositionElements(w, h);
		// 		this.scoreUI.resizeAndRepositionElements(w, h);
		// 		this.timerUI.resizeAndRepositionElements(w, h);
		// 		break;
		// 	case EGameState.END:
		// 		this.endScreen.resizeAndRepositionElements(w, h);
		// 		this.scoreBreakup.resizeAndRepositionElements(w, h);
		// 		break;
		// }
	}
}
