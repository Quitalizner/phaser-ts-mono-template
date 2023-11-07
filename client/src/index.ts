import 'regenerator-runtime/runtime';
import 'phaser';
import './shared/styles/reset.scss';
import './shared/styles/index.scss';
import { Game } from './game/game.component';

window.addEventListener('load', () => {
	Game.setupGame();
});
