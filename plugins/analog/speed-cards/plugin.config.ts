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
