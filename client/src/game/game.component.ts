import './game.styles.scss';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin';
import { AbstractScene } from './src/scenes/AbstractScene';
import { BootScene } from './src/scenes/BootScene';
import { GameScene } from './src/scenes/GameScene';
import { GameResizer } from './src/utils/GameResizer';
import { UIScene } from './src/scenes/UIScene';
import { MultiplayerServer } from '../multiplayer/MultiplayerServer';
import { initFirebase } from '../firebase/init';
import { Device } from './src/utils/Device';

type GameConfig = Phaser.Types.Core.GameConfig;

export class Game {
	static setupGame(): void {
		const renderer = Phaser.AUTO;
		const config: GameConfig = {
			type: renderer,
			title: 'Knapsack-X | Bingo',
			backgroundColor: '#000',
			banner: process.env.NODE_ENV === 'development',
			scale: {
				fullscreenTarget: 'app-root',
				parent: 'phaser-canvas',
				mode: Phaser.Scale.NONE,
				width: 540,
				height: 960,
				autoRound: true,
			},
			plugins: {
				global: [
					{
						key: 'rexRoundRectanglePlugin',
						plugin: RoundRectanglePlugin,
						start: true,
					},
					// ...
				],
			},
		};

		const device = new Device().init();
		if (!(device.desktop || (device.iOS && !(device.iPhone || device.iPad)))) {
			config.batchSize = 16;
		}

		const game = new Phaser.Game(config);
		const gameResizer = new GameResizer(game);
		window.addEventListener('resize', () => {
			gameResizer.resize();
		});
		window.addEventListener('orientationchange', () => {
			// Added a time delay since it's observed that devicePixelRatio updates the next frame
			setTimeout(() => {
				gameResizer.resize();
			}, 1);
		});

		game.scene.add('boot', BootScene);
		game.scene.add('game', GameScene);
		game.scene.add('ui', UIScene);

		initFirebase();
		const globalEvents = new Phaser.Events.EventEmitter();
		const server = new MultiplayerServer();

		const startInterval = setInterval(() => {
			if (game && game.scene && game.scene.scenes && game.scene.scenes[1]) {
				clearInterval(startInterval);
				(game.scene.scenes as AbstractScene[]).forEach((scene: AbstractScene) => {
					scene.grs = gameResizer;
					scene.server = server;
					scene.globalEvents = globalEvents;
					scene.attachHandlers();
				});
				game.scene.start('boot');
			}
		}, 50);
	}
}
