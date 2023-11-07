import { AbstractScene } from './AbstractScene';
import { AssetsPreloader } from '../utils/AssetPreloader';
import { AudioManager } from '../core/AudioManager';
import { WEB_VIEW_EVENTS } from '../cfg/constants/web-view-events';
import { GetParams } from '../cfg/constants/static-constants';

export class BootScene extends AbstractScene {
	assetsPreloader: AssetsPreloader;

	hasAssetsLoaded = false;
	hasPlayerLoggedIn = true;

	constructor() {
		super('boot');
		this.assetsPreloader = new AssetsPreloader(this);
	}

	preload(): void {
		// Load all loading bar related assets here assets here
		this.assetsPreloader.loadBootSceneAssets();

		// @ts-ignore User Activation Exists on some browsers
		if (navigator.userActivation && navigator.userActivation.hasBeenActive) {
			// this.game.scale.startFullscreen();
		}
	}

	resizeAndRepositionElements(): void {
		//
	}

	create(): void {
		this.audioManager = new AudioManager(this);
		this.audioManager.initBootAudio();

		this.handleLoadingProgress();
		this.assetsLoadedHandler();
		// To load main game assets
		this.assetsPreloader.loadGameSceneAssets();
		// const token = GetParams('token');
		// if (token && token !== '') {
		// 	console.warn('token', token);
		// 	this.handlePlayerLogin(token as string);
		// }

		// @ts-ignore Called from within react native
		const reactNativeWebView = window.ReactNativeWebView;

		// const messageHandler = (event: any) => {
		// 	const response = event.data;
		// 	console.log('Received response from game:', response, response.type);
		// 	reactNativeWebView.postMessage(response);
		// 	const data = JSON.parse(response);
		// 	if (data.type === WEB_VIEW_EVENTS.START_GAME) {
		// 		// Remove the event listener after receiving a response
		// 		// useCapture: true is very important for the message to come through from RN
		// 		window.removeEventListener('message', messageHandler, true);

		// 		// Resolve or reject the Promise based on the response
		// 		this.server.gameType = data.gameType;
		// 		this.handlePlayerLogin(data.token);
		// 	} else if (data.type === WEB_VIEW_EVENTS.USER_TOKEN) {
		// 		this.server.updateToken(data.token);
		// 	}
		// };
		// // useCapture: true is very important for the message to come through from RN
		// window.addEventListener('message', messageHandler, true);

		// if (reactNativeWebView) {
		// reactNativeWebView.postMessage(WEB_VIEW_EVENTS.START_GAME);
		// }
	}

	private handlePlayerLogin(token: string) {}

	private handleLoadingProgress(): void {
		this.load.on('progress', (percentage: number) => {
			this.updateLoadingBar(percentage);
		});
	}

	private updateLoadingBar(percentage: number): void {
		console.warn('percentage', percentage);
	}

	private assetsLoadedHandler() {
		this.load.on('complete', () => {
			this.hasAssetsLoaded = true;
			this.handleSceneExit();
		});
	}

	private handleSceneExit(): void {
		if (this.hasAssetsLoaded && this.hasPlayerLoggedIn) {
			this.turnOffResizeHandler();
			this.assetsPreloader.createAnimations();
			this.scene.start('game');
		}
	}
}
