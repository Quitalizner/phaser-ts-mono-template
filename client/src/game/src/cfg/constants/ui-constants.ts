import { GAME_FONT, GAME_FONT_MEDIUM } from './game-constants';

export const UI_DEPTH = {
	ui: 9,
	overlay: 10,
	countdown: 11,
	end: 12,
	landscapeOrientation: 99,
};

export const COUNTDOWN_CONFIG = {
	fontData: {
		fontFamily: GAME_FONT,
		fontSize: '108px',
		resolution: 2,
		color: `#ea00d9`,
	},
};

export const FEEDBACK_CONFIG = {
	fontData: {
		fontFamily: GAME_FONT,
		fontSize: '45px',
		resolution: 2,
		color: `#ffffff`,
	},
	strokeThickness: 9,
	landscapeY: -0.455,
	portraitY: -0.37,
	perfectColor: '#ea00d9',
	goodColor: '#fcd25e',
	correctColor: '#177deb',
	incorrect: '#f63765',
};

export const SCORE_UI_CONFIG = {
	fontData: {
		fontFamily: GAME_FONT,
		fontSize: '36px',
		resolution: 2,
		color: `#ffffff`,
	},
	pointsFontData: {
		fontFamily: GAME_FONT,
		fontSize: '30px',
		resolution: 2,
		color: `#ffffff`,
	},
	landscape: { x: 0.5, y: -0.375 },
	portrait: { x: 0, y: -0.43 },
	correctColor: '#ffffff',
	incorrectColor: '#f63765',
};

export const TIMER_UI_CONFIG = {
	fontData: {
		fontFamily: GAME_FONT,
		fontSize: '30px',
		resolution: 2,
		color: `#ffffff`,
	},
	landscape: { x: -0.5, y: -0.375 },
	portrait: { x: -0.5, y: -0.45 },
};

export const AVATAR_CONFIG = {
	maskRadius: 108,
	characterScale: 2.1,
	defaultAvatarId: 1,
	inactiveAvatarId: 0,
	matchMaking: {
		scale: 1,
		inactiveAlpha: 0.3,
		activeAlpha: 1,
	},
	gameUI: {
		scale: 0.25,
	},
	resultUI: {
		scale: 0.35,
	},
};

export const MATCH_SCREEN_CONFIG = {
	nameFontData: {
		fontFamily: GAME_FONT_MEDIUM,
		fontSize: '36px',
		resolution: 2,
		color: `#ffffff`,
	},
	vsFontData: {
		fontFamily: GAME_FONT,
		fontSize: '64px',
		resolution: 2,
		color: `#ffffff`,
	},
	matchStatusFontData: {
		fontFamily: GAME_FONT_MEDIUM,
		fontSize: '42px',
		resolution: 2,
		color: `#ffffff`,
	},
	matchResultFontData: {
		fontFamily: GAME_FONT,
		fontSize: '54px',
		resolution: 2,
		color: `#ffffff`,
	},
};

export const PLAYER_UI_CONFIG = {
	nameFontData: {
		fontFamily: GAME_FONT_MEDIUM,
		fontSize: '24px',
		resolution: 2,
		color: `#ffffff`,
	},
	playerNameColor: `#FFE291`,
	opponentNameColor: `#F63765`,
	scoreFontData: {
		fontFamily: GAME_FONT_MEDIUM,
		fontSize: '42px',
		resolution: 2,
		color: `#ffffff`,
	},
};

export const SCORE_BREAKUP_SCREEN = {
	labelFontData: {
		fontFamily: GAME_FONT_MEDIUM,
		fontSize: '36px',
		resolution: 2,
		color: `#ffffff`,
	},
	scoreFontData: {
		fontFamily: GAME_FONT,
		fontSize: '45px',
		resolution: 2,
		color: `#ffffff`,
	},
	perfectColor: `#EA00D9`,
	goodColor: `#177DEB`,
	correctColor: `#EFC75E`,
	bingoColor: `#7232DD`,
	wrongColor: `#F42E5E`,
};

export const UI_EVENTS = {
	POPUP_OVERLAY: 'popup-overlay',
	MAIN_MENU: 'main-menu',
	TIMER_END: 'timer-end',
	GAME_OVER: 'game-over',
	LEADERBOARD: 'leaderboard',
	FEEDBACK_COMPLETE: 'feedback-complete',
};
