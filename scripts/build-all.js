import { readdirSync, readFileSync } from 'fs';
import { build } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

const pluginsDir = resolve(import.meta.dirname, '../plugins');
const outDir = resolve(import.meta.dirname, '../dist');

const plugins = readdirSync(pluginsDir, { withFileTypes: true })
	.filter(d => d.isDirectory())
	.map(d => {
		const manifest = JSON.parse(
			readFileSync(resolve(pluginsDir, d.name, 'manifest.json'), 'utf-8')
		);
		return { id: d.name, entry: resolve(pluginsDir, d.name, manifest.entry) };
	});

for (const plugin of plugins) {
	console.log(`Building ${plugin.id}...`);
	await build({
		plugins: [svelte({ compilerOptions: { css: 'injected' } })],
		build: {
			lib: {
				entry: plugin.entry,
				formats: ['es'],
				fileName: () => `${plugin.id}.js`,
			},
			outDir: resolve(outDir, plugin.id),
			emptyOutDir: true,
			rollupOptions: {
				external: ['svelte', 'svelte/internal', /^svelte\//, 'three'],
			},
			minify: false,
		},
		resolve: {
			alias: {
				'$shared': resolve(import.meta.dirname, '../shared'),
			},
		},
	});
	console.log(`  → dist/${plugin.id}/${plugin.id}.js`);
}

console.log('Done.');
