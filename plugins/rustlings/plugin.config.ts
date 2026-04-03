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
	componentPath: 'src/RustlingsBox.svelte',
	fields: [],
});
