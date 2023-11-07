// Fisher-Yates (aka Knuth) Shuffle.
export function shuffle<T>(array: Array<T>): Array<T> {
	let currentIndex = array.length;
	let randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export function formatTime(timeInSeconds: number): string {
	// const hours = Math.floor(this.timeSeconds / 3600);
	const secondsPostHours = timeInSeconds % 3600;
	const minutes = Math.floor(secondsPostHours / 60);
	const seconds: number = secondsPostHours % 60;
	return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
}

// Returns the veloctiy along the curve at time t
export function dcubicHermite(
	p0: Phaser.Math.Vector2,
	v0: Phaser.Math.Vector2,
	p1: Phaser.Math.Vector2,
	v1: Phaser.Math.Vector2,
	t: number,
	timeScale: number
) {
	const dh00 = 6 * t * t - 6 * t,
		dh10 = 3 * t * t - 4 * t + 1,
		dh01 = -6 * t * t + 6 * t,
		dh11 = 3 * t * t - 2 * t;

	const out = new Phaser.Math.Vector2();
	if (p0.x) {
		out.x = dh00 * p0.x + dh10 * timeScale * v0.x + dh01 * p1.x + dh11 * timeScale * v1.x;
	}
	if (p0.y) {
		out.y = dh00 * p0.y + dh10 * timeScale * v0.y + dh01 * p1.y + dh11 * timeScale * v1.y;
	}
	return out;
}

// Returns the point along the curve at time t
export function cubicHermite(
	p0: Phaser.Math.Vector2,
	v0: Phaser.Math.Vector2,
	p1: Phaser.Math.Vector2,
	v1: Phaser.Math.Vector2,
	t: number,
	timeScale: number
) {
	const ti = t - 1,
		t2 = t * t,
		ti2 = ti * ti,
		h00 = (1 + 2 * t) * ti2,
		h10 = t * ti2,
		h01 = t2 * (3 - 2 * t),
		h11 = t2 * ti;

	const out = new Phaser.Math.Vector2();
	if (p0.x) {
		out.x = h00 * p0.x + h10 * timeScale * v0.x + h01 * p1.x + h11 * timeScale * v1.x;
	}
	if (p0.y) {
		out.y = h00 * p0.y + h10 * timeScale * v0.y + h01 * p1.y + h11 * timeScale * v1.y;
	}
	return out;
}
