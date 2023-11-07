import { GAME_SOUNDS } from '../cfg/constants/game-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

const ASSETS_PREFIX_URL = 'game/src/assets/img/';

export class AssetsPreloader {
	scene: AbstractScene;

	constructor(scene: AbstractScene) {
		this.scene = scene;
	}

	// Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
	loadBootSceneAssets(): void {
		this.scene.load.maxParallelDownloads = 10;
		this.scene.load.xhr.timeout = 10;
		this.scene.load.setBaseURL('/'); // Since in react we alter the url using router-dom. It's necessary to set this to '/'
		this.scene.load.path = ASSETS_PREFIX_URL;

		// this.scene.load.start();
	}

	// Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
	loadGameSceneAssets(): void {
		this.scene.load.path = `${ASSETS_PREFIX_URL}`;

		this.scene.load.image('bg_circles', 'background_circles.png');

		// this.scene.load.spritesheet('avatars', 'avatar/avatars.png', {
		// 	frameWidth: 110,
		// 	frameHeight: 110,
		// });

		// PAWNS
		// for (let i = 0; i < 4; ++i) {
		// 	this.scene.load.spritesheet(`${i}_enemy`, `pawn/${i}_enemy.png`, {
		// 		frameWidth: i > 1 ? 111 : 110,
		// 		frameHeight: 109,
		// 		startFrame: 0,
		// 		endFrame: 3,
		// 	});
		// }

		// AUDIO
		this.scene.load.path = `game/src/assets/audio/`;
		for (let i = 0; i < GAME_SOUNDS.length; ++i) {
			this.scene.load.audio(GAME_SOUNDS[i].key, `${GAME_SOUNDS[i].key}.${GAME_SOUNDS[i].ext}`);
		}

		this.scene.load.start();
	}

	createAnimations(): void {
		// for (let i = 0; i < 4; ++i) {
		// 	this.scene.anims.create({
		// 		key: `${i}_enemy`,
		// 		frames: this.scene.anims.generateFrameNames(`${i}_enemy`, {
		// 			start: 0,
		// 			end: 3,
		// 		}),
		// 		repeat: -1,
		// 		frameRate: 5,
		// 	});
		// }
	}
}
