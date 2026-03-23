import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { build } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

const pluginsDir = resolve(import.meta.dirname, '../plugins');
const outDir = resolve(import.meta.dirname, '../dist');
const tmpDir = resolve(import.meta.dirname, '../.tmp-entries');

mkdirSync(tmpDir, { recursive: true });

const plugins = readdirSync(pluginsDir, { withFileTypes: true })
	.filter(d => d.isDirectory())
	.map(d => {
		const manifest = JSON.parse(
			readFileSync(resolve(pluginsDir, d.name, 'manifest.json'), 'utf-8')
		);
		return {
			id: d.name,
			componentPath: resolve(pluginsDir, d.name, manifest.entry),
		};
	});

for (const plugin of plugins) {
	console.log(`Building ${plugin.id}...`);

	const wrapperPath = resolve(tmpDir, `${plugin.id}-entry.js`);
	writeFileSync(wrapperPath, [
		`import { mount, unmount } from 'svelte';`,
		`import Component from '${plugin.componentPath}';`,
		`export function mountPlugin(target, props) {`,
		`  return mount(Component, { target, props });`,
		`}`,
		`export function unmountPlugin(instance) {`,
		`  unmount(instance);`,
		`}`,
	].join('\n'));

	await build({
		plugins: [svelte({ compilerOptions: { css: 'injected' } })],
		build: {
			lib: {
				entry: wrapperPath,
				formats: ['es'],
				fileName: () => `${plugin.id}.js`,
			},
			outDir: resolve(outDir, plugin.id),
			emptyOutDir: true,
			minify: true,
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
