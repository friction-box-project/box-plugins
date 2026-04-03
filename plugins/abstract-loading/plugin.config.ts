import { definePlugin, defineField } from '@open-friction/sdk';

export default definePlugin({
	id: 'abstract-loading',
	version: '0.1.0',
	name: 'Abstract Loading',
	tagline: 'Liquid light while you wait',
	description: 'A mesmerizing abstract animation using WebGL shaders — flowing, iridescent forms inspired by visual music and liquid art.',
	author: 'justinvidual',
	category: 'reflect',
	tags: ['abstract', 'animation', 'loading', 'visual', 'meditative'],
	componentPath: 'src/AbstractLoadingBox.svelte',
	fields: [
		defineField.number({ key: 'duration', label: 'Duration (seconds)', min: 5, max: 120, default: 15 }),
		defineField.select({ key: 'style', label: 'Style', options: ['diffusion', 'vortex'], default: 'diffusion' }),
		defineField.select({ key: 'palette', label: 'Palette', options: ['jupiter', 'cosmic', 'aurora', 'ember', 'ocean', 'water'], default: 'jupiter' }),
		defineField.number({ key: 'speed', label: 'Speed', min: 10, max: 100, default: 10 }),
	],
});
