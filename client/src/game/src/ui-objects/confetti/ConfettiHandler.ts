import { EventEmitter } from 'events';
import { ConfettiPool } from './ConfettiPool';
import { Confetti } from './Confetti';
import { AbstractScene } from '../../scenes/AbstractScene';
import { CUSTOM_EVENTS } from '../../cfg/constants/game-constants';

export class ConfettiHandler {
	events: EventEmitter;

	confettiPool!: ConfettiPool;
	activeConfettis: Confetti[] = [];

	constructor(public scene: AbstractScene) {
		this.events = new EventEmitter();
		this.createPool();
	}

	protected createPool() {
		this.confettiPool = new ConfettiPool(this.scene);
	}

	spawnConfetti(x: number, y: number) {
		const confetti = this.confettiPool.get(x, y);
		if (confetti) {
			this.activeConfettis.push(confetti);
		}
	}

	handleConfettiPickup(confetti: Confetti) {
		confetti.events.once(CUSTOM_EVENTS.PARTICLE_COMPLETE, () => {
			this.confettiPool.put(confetti);
			const findIndex = this.activeConfettis.findIndex((activeConfetti) => {
				return activeConfetti === confetti;
			});
			if (findIndex !== -1) {
				this.activeConfettis.splice(findIndex, 1);
			} else {
				console.error('active confetti not found');
			}
		});
	}

	cleanUp() {
		for (const confetti of this.activeConfettis) {
			this.confettiPool.put(confetti);
		}
		this.activeConfettis = [];
	}
}
