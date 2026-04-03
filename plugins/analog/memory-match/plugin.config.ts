import { definePlugin, defineField } from '@open-friction/sdk';

export default definePlugin({
	id: 'memory-match',
	version: '0.1.0',
	name: 'Memory Match',
	tagline: 'Find matching pairs to earn access',
	description: 'A classic concentration card game. Flip cards and find all matching pairs. Tests and improves your short-term memory with each visit.',
	author: 'frictionbox',
	category: 'remember',
	tags: ['memory', 'cards', 'concentration', 'matching', 'brain'],
	icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="8" height="10" rx="1.5"/><rect x="14" y="3" width="8" height="10" rx="1.5"/><rect x="8" y="11" width="8" height="10" rx="1.5"/></svg>',
	componentPath: 'src/MemoryMatchBox.svelte',
	fields: [
		defineField.select({
			key: 'pairs',
			label: 'Number of pairs',
			options: ['4', '6', '8', '10', '12'],
			default: '6',
		}),
	],
});
