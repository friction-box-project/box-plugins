import { definePlugin, defineField } from '@open-friction/sdk';

export default definePlugin({
	id: 'polyglot',
	version: '1.0.0',
	name: 'Coding Polyglot',
	tagline: 'Test your programming instincts',
	description: 'Quick code reading challenges across programming languages. Predict what the code outputs to sharpen your understanding of language semantics.',
	author: 'justinvidual',
	category: 'train',
	tags: ['coding', 'programming', 'languages', 'challenge'],
	componentPath: 'src/PolyglotBox.svelte',
	connectors: [{ kind: 'llm' }],
	fields: [
		defineField.select({ key: 'focus', label: 'Focus', options: ['mixed', 'gotchas', 'idioms', 'fundamentals'], default: 'mixed' }),
		defineField.boolean({ key: 'python', label: 'Python', default: true }),
		defineField.boolean({ key: 'javascript', label: 'JavaScript', default: true }),
		defineField.boolean({ key: 'typescript', label: 'TypeScript', default: false }),
		defineField.boolean({ key: 'rust', label: 'Rust', default: false }),
		defineField.boolean({ key: 'go', label: 'Go', default: false }),
		defineField.boolean({ key: 'java', label: 'Java', default: false }),
		defineField.boolean({ key: 'c', label: 'C', default: false }),
		defineField.boolean({ key: 'ruby', label: 'Ruby', default: false }),
	],
});
