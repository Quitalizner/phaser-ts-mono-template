import { AbstractScene } from '../../scenes/AbstractScene';
import { Confetti } from './Confetti';

type Constructor<T = Confetti> = new (...args: any) => T;

export class ConfettiPool {
	pool: Confetti[] = [];
	confettiConstructor: Constructor = Confetti;

	constructor(public scene: AbstractScene) {}

	get(x: number, y: number): Confetti | null {
		let confetti;
		if (this.pool.length) {
			confetti = this.pool.pop()!;
		} else {
			confetti = new this.confettiConstructor(this.scene);
		}
		confetti.spawn(x, y);
		return confetti;
	}

	put(confetti: Confetti) {
		confetti.despawn();
		this.pool.push(confetti);
	}
}
