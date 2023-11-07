import { CUSTOM_EVENTS } from '../../cfg/constants/game-constants';
import { AbstractScene } from '../../scenes/AbstractScene';

export class Confetti {
	emitter: Phaser.GameObjects.Particles.ParticleEmitter;
	events: Phaser.Events.EventEmitter;
	constructor(public scene: AbstractScene) {
		this.events = new Phaser.Events.EventEmitter();

		const hsv = Phaser.Display.Color.HSVColorWheel();
		const tint = hsv.map((entry) => entry.color);
		const rotate = new Array(12).fill(0).map((_, i) => i * 30);
		console.warn(rotate);
		this.emitter = this.scene.add.particles(0, 0, 'confetti', {
			lifespan: 1000,
			speed: { min: 300, max: 600 },
			rotate,
			scale: { min: 1.2, max: 2 },
			alpha: { start: 1, end: 0 },
			gravityY: 200,
			tint,
			frequency: 10,
			radial: true,
			emitting: false,
		});
		this.emitter.on(Phaser.GameObjects.Particles.Events.COMPLETE, () => {
			this.events.emit(CUSTOM_EVENTS.PARTICLE_COMPLETE);
		});
		this.despawn();
	}

	spawn(x: number, y: number) {
		this.emitter.setPosition(x, y);
		this.emitter.start(0, 600);
	}

	despawn() {
		this.events.removeAllListeners();
	}
}
