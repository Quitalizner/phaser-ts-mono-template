export class MultiplayerServer {
	gameEvents: Phaser.Events.EventEmitter;

	avgLagMS: number[] = [];

	constructor() {
		this.gameEvents = new Phaser.Events.EventEmitter();
	}

}
