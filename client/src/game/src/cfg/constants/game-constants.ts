export const BG_COLOR = 0xffffff;

export const MAIN_COLOR = 0x582aa5;
export const MAIN_COLOR_HEX = '#582aa5';

export const DARK_COLOR = 0x333333;
export const DARK_COLOR_HEX = '#333333';

export const GAME_FONT = 'GameFontBlack';
export const GAME_FONT_MEDIUM = 'GameFontMedium';
export const GAME_FONT_BOLD = 'GameFontBold';

export const CUSTOM_EVENTS = {
	BUTTON_CLICKED: 'button-clicked',
	PRE_EMPT_CALL: 'pre-empt-call',
	HIT_TIMER_ENDED: 'hit-timer-ended',
	PARTICLE_COMPLETE: 'particle-complete',
	BALL_DISPLAYED: 'ball-displayed',
	CORRECT_CALL: 'correct-call',
	INCORRECT_CALL: 'incorrect-call',
	MARK_CELL: 'mark-cell',
	BINGO: 'bingo',
};

export const SERVER_EVENTS = {
	NEXT_NUMBER: 'next-number',
	PLAYER_SCORE: 'player-score',
	OPPONENT_SCORE: 'opponent-score',
	MARK_CELL: 'mark-cell',
	MAKE_BINGO: 'make-bingo',
};

export const GAME_DEPTH = {
	map: 1,
	collectible: 2,
	pawn: 3,
	gameUI: 4,
};

export const CELL_CONFIG = {
	markedColor: 0xea00d9,
	markedFontColor: '#ffffff',
	invalidColor: 0xf63765,
	invalidFontColor: MAIN_COLOR_HEX,
	clearColor: 0xffffff,
	clearFontColor: MAIN_COLOR_HEX,
	bingoFontData: {
		fontFamily: GAME_FONT,
		fontSize: '90px',
		resolution: 2,
		color: '#ffffff',
	},
	markFontData: {
		fontFamily: GAME_FONT_BOLD,
		fontSize: '62px',
		resolution: 2,
		color: MAIN_COLOR_HEX,
	},
	headerFontData: {
		fontFamily: GAME_FONT,
		fontSize: '45px',
		resolution: 2,
		color: '#ffffff',
	},
};

export const BALL_CONFIG = {
	markingFontData: {
		fontFamily: GAME_FONT_BOLD,
		fontSize: '52px',
		resolution: 2,
		color: DARK_COLOR_HEX,
	},
};

export const QUEUE_CONFIG = {
	portrait: {
		startX: 290,
		startY: -410,
		gapX: -140,
		gapY: 0,
		scale: 0.85,
	},
	landscape: {
		startX: -450,
		startY: -300,
		gapX: 0,
		gapY: 150,
		scale: 1,
	},
};

export const QUEUE_MASK_CONFIG = {
	portrait: {
		x: -350,
		y: -525,
		width: 720,
		height: 180,
	},
	landscape: {
		x: -575,
		y: -425,
		width: 225,
		height: 800,
	},
};

export const HIT_TIMER_CONFIG = {
	portrait: {
		x: QUEUE_CONFIG.portrait.startX,
		y: QUEUE_CONFIG.portrait.startY - 72,
	},
	landscape: {
		x: QUEUE_CONFIG.landscape.startX,
		y: QUEUE_CONFIG.landscape.startY - 81,
	},
};

export const HEADER_CELL_PROPS = [
	{ color: 0x7131dd, text: 'B' },
	{ color: 0xfcd25e, text: 'I' },
	{ color: 0xf63765, text: 'N' },
	{ color: 0x177deb, text: 'G' },
	{ color: 0xea00d9, text: 'O' },
];

export const GAME_SOUNDS = [
	{ key: 'bingo', ext: 'mp3', volume: 1, loop: false },
	// { key: 'pick', ext: 'wav', volume: 1, loop: false },
	// { key: 'correct', ext: 'wav', volume: 0.3, loop: false },
	// { key: 'wrong', ext: 'wav', volume: 0.3, loop: false },
	// { key: 'bingo', ext: 'mp3', volume: 1, loop: false },
];

for (let i = 1; i <= 75; ++i) {
	let letter = '';
	if (i > 60) {
		letter = 'O';
	} else if (i > 45) {
		letter = 'G';
	} else if (i > 30) {
		letter = 'N';
	} else if (i > 15) {
		letter = 'I';
	} else {
		letter = 'B';
	}
	// GAME_SOUNDS.push({ key: `${letter}${i}`, ext: 'mp3', volume: 1, loop: false });
}
