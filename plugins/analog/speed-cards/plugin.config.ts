import { definePlugin, defineField } from '@open-friction/sdk';

export default definePlugin({
	id: 'speed-cards',
	version: '0.1.0',
	name: 'Speed Cards',
	tagline: 'Memorize the sequence, recall in order',
	description: 'Cards flip face-up one at a time. Watch the sequence, then recall them in order. A classic memory sport technique that builds real short-term memory skills with every visit.',
	author: 'frictionbox',
	category: 'remember',
	tags: ['memory', 'sequence', 'cards', 'recall', 'speed'],
	icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="16" rx="2"/><rect x="4" y="5" width="12" height="16" rx="2" opacity="0.4"/><path d="M10 10l2-2 2 2"/></svg>`,
	componentPath: 'src/SpeedCardsBox.svelte',
	fields: [
		defineField.select({
			key: 'length',
			label: 'Sequence length',
			options: ['3', '4', '5', '6', '7', '8'],
			default: '4',
		}),
		defineField.select({
			key: 'showTimeMs',
			label: 'Card show time',
			options: ['600', '800', '1000', '1500', '2000'],
			default: '1000',
		}),
		defineField.select({
			key: 'deck',
			label: 'Card deck',
			options: ['emoji', 'numbers', 'letters'],
			default: 'emoji',
		}),
	],
});
