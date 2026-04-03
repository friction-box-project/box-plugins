import { shuffle } from '@open-friction/sdk';

const EMOJI_POOL = [
	'\ud83d\udc36', '\ud83d\udc31', '\ud83d\udc2d', '\ud83d\udc30', '\ud83e\udd8a', '\ud83d\udc3b',
	'\ud83d\udc27', '\ud83e\udd89', '\ud83e\udd8b', '\ud83d\udc22', '\ud83d\udc19', '\ud83e\udd80',
	'\ud83c\udf3b', '\ud83c\udf35', '\ud83c\udf1f', '\ud83c\udf08', '\ud83d\udd25', '\ud83c\udf0a',
	'\ud83c\udfb2', '\ud83d\udcda', '\ud83d\udd11', '\ud83d\udc8e', '\ud83c\udfaf', '\ud83e\udde9',
];

const NUMBER_POOL = Array.from({ length: 20 }, (_, i) => String(i + 1));

const LETTER_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export type DeckType = 'emoji' | 'numbers' | 'letters';

export function drawCards(deck: DeckType, count: number): string[] {
	const pool = deck === 'numbers' ? NUMBER_POOL
		: deck === 'letters' ? LETTER_POOL
		: EMOJI_POOL;
	return shuffle([...pool]).slice(0, count);
}
