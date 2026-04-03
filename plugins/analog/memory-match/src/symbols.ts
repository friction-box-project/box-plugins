import { shuffle } from '@open-friction/sdk';

const POOL = [
	'\ud83d\udc36', '\ud83d\udc31', '\ud83d\udc2d', '\ud83d\udc30', '\ud83e\udd8a', '\ud83d\udc3b',
	'\ud83d\udc27', '\ud83e\udd89', '\ud83e\udd8b', '\ud83d\udc22', '\ud83d\udc19', '\ud83e\udd80',
	'\ud83c\udf3b', '\ud83c\udf35', '\ud83c\udf1f', '\ud83c\udf08', '\ud83d\udd25', '\ud83c\udf0a',
	'\ud83c\udfb2', '\ud83d\udcda', '\ud83d\udd11', '\ud83d\udc8e', '\ud83c\udfaf', '\ud83e\udde9',
];

export function pickSymbols(count: number): string[] {
	return shuffle([...POOL]).slice(0, count);
}

export function getGridLayout(pairs: number): { cols: number; rows: number } {
	switch (pairs) {
		case 4: return { cols: 4, rows: 2 };
		case 6: return { cols: 4, rows: 3 };
		case 8: return { cols: 4, rows: 4 };
		case 10: return { cols: 5, rows: 4 };
		case 12: return { cols: 6, rows: 4 };
		default: return { cols: 4, rows: 3 };
	}
}
