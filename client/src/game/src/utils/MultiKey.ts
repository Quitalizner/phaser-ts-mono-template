/* eslint-disable no-restricted-syntax */
import { AbstractScene } from '../scenes/AbstractScene';

/**
 * A small class to allow multiple Phaser keys to treated as one input. E.g. the left arrow and "A"
 * key can be wrapped up into one "input" so that we can check whether the player pressed either
 * button.
 */
export class MultiKey {
	keys: Phaser.Input.Keyboard.Key[];

	constructor(scene: AbstractScene, keyCodes: number[]) {
		this.keys = keyCodes.map((key) => scene.input.keyboard!.addKey(key));
	}

	// Are any of the keys down?
	isDown() {
		return this.keys.some((key) => key.isDown);
	}

	// Are all of the keys up?
	isUp() {
		return this.keys.every((key) => key.isUp);
	}

	onDown(callback: (event: KeyboardEvent) => void) {
		for (const key of this.keys) {
			key.onDown = callback;
		}
	}

	clear() {
		this.keys.forEach((key) => {
			key.destroy();
		});
		this.keys = [];
	}
}
