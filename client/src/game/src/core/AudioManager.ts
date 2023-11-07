import { GAME_SOUNDS } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class AudioManager {
	scene: AbstractScene;
	private bgSounds: Map<string, Phaser.Sound.BaseSound> = new Map();
	private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();

	isSoundOn = true;
	isMusicOn = true;

	constructor(scene: AbstractScene) {
		this.scene = scene;
	}

	initBootAudio(): void {
		// If any audio needs to play in boot scene, add it here.
	}

	initGameAudio(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (GAME_SOUNDS[i].loop) {
				this.bgSounds.set(
					GAME_SOUNDS[i].key,
					this.scene.sound.add(GAME_SOUNDS[i].key, {
						volume: GAME_SOUNDS[i].volume,
						loop: GAME_SOUNDS[i].loop,
					})
				);
			} else {
				this.sounds.set(
					GAME_SOUNDS[i].key,
					this.scene.sound.add(GAME_SOUNDS[i].key, {
						volume: GAME_SOUNDS[i].volume,
						loop: GAME_SOUNDS[i].loop,
					})
				);
			}
		}
	}

	initUIAudio(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (GAME_SOUNDS[i].loop) {
				this.bgSounds.set(
					GAME_SOUNDS[i].key,
					this.scene.sound.add(GAME_SOUNDS[i].key, {
						volume: GAME_SOUNDS[i].volume,
						loop: GAME_SOUNDS[i].loop,
					})
				);
			} else {
				this.sounds.set(
					GAME_SOUNDS[i].key,
					this.scene.sound.add(GAME_SOUNDS[i].key, {
						volume: GAME_SOUNDS[i].volume,
						loop: GAME_SOUNDS[i].loop,
					})
				);
			}
		}
	}

	playClick(): void {
		this.play('click');
	}

	play(key: string, shouldStopPrevious = true): void {
		if (!this.isSoundOn) {
			return;
		}
		const sound = this.sounds && this.sounds.get(key);
		if (this.sounds && sound) {
			if (shouldStopPrevious) {
				sound.stop();
			}
			sound.play();
		} else {
			console.warn(`Cannot find sound with key: ${key}`);
		}
	}

	playMusic(key: string, shouldStopPrevious = true): void {
		if (!this.isMusicOn) {
			return;
		}
		const bgSound = this.bgSounds && this.bgSounds.get(key);
		if (bgSound) {
			if (shouldStopPrevious) {
				bgSound.stop();
			}
			bgSound.play();
		} else {
			console.warn(`Cannot find music with key: ${key}`);
		}
	}

	onceComplete(key: string, callback: () => void): void {
		const sound = this.sounds && this.sounds.get(key);
		if (this.sounds && sound) {
			sound.play();
			sound.once('complete', () => {
				callback();
			});
		} else {
			console.warn(`Cannot find sound with key: ${key}`);
		}
	}

	stopSound(key: string): void {
		const sound = this.sounds && this.sounds.get(key);
		if (this.sounds && sound) {
			sound.stop();
		} else {
			console.warn(`Cannot find sound with key: ${key}`);
		}
	}

	toggleSound(): void {
		this.isSoundOn = !this.isSoundOn;
		if (this.isSoundOn) {
			this.turnOnSound();
		} else {
			this.turnOffSound();
		}
	}

	toggleMusic(): void {
		this.isMusicOn = !this.isMusicOn;
		if (this.isMusicOn) {
			this.turnOnMusic();
		} else {
			this.turnOffMusic();
		}
	}

	checkIfSoundOn(): boolean {
		return this.isSoundOn;
	}

	checkIfMusicOn(): boolean {
		return this.isMusicOn;
	}

	turnOffMusic(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (GAME_SOUNDS[i].loop) {
				(this.bgSounds.get(GAME_SOUNDS[i].key) as Phaser.Sound.WebAudioSound).setVolume(0);
			}
		}
	}

	turnOnMusic(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (GAME_SOUNDS[i].loop) {
				(this.bgSounds.get(GAME_SOUNDS[i].key) as Phaser.Sound.WebAudioSound).setVolume(
					GAME_SOUNDS[i].volume
				);
			}
		}
	}

	turnOffSound(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (!GAME_SOUNDS[i].loop) {
				(this.sounds.get(GAME_SOUNDS[i].key) as Phaser.Sound.WebAudioSound).setVolume(0);
			}
		}
	}

	turnOnSound(): void {
		for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
			if (!GAME_SOUNDS[i].loop) {
				(this.sounds.get(GAME_SOUNDS[i].key) as Phaser.Sound.WebAudioSound).setVolume(
					GAME_SOUNDS[i].volume
				);
			}
		}
	}
}
