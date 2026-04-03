import { definePlugin } from '@open-friction/sdk';

export default definePlugin({
	id: 'rustlings',
	version: '1.0.0',
	name: 'Rustlings',
	tagline: 'Learn Rust, one exercise at a time',
	description: 'An incremental Rust learning game mapped to The Rust Programming Language book. Navigate a skill tree of concepts and solve coding exercises to progress.',
	author: 'justinvidual',
	category: 'train',
	tags: ['rust', 'programming', 'learning', 'coding'],
	icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
	componentPath: 'src/RustlingsBox.svelte',
	fields: [],
});
