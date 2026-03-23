import { readdirSync, readFileSync, writeFileSync, existsSync, cpSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const pluginsDir = resolve(import.meta.dirname, '../plugins');
const distDir = resolve(import.meta.dirname, '../dist');
const registryPath = resolve(import.meta.dirname, '../registry.json');

const pluginDirs = readdirSync(pluginsDir, { withFileTypes: true })
	.filter(d => d.isDirectory() && existsSync(resolve(pluginsDir, d.name, 'plugin.config.ts')));

const registryEntries = [];

for (const dir of pluginDirs) {
	const pluginPath = resolve(pluginsDir, dir.name);
	console.log(`\nBuilding ${dir.name}...`);
	execSync('bunx frictionbox build --registry', { cwd: pluginPath, stdio: 'inherit' });

	const manifest = JSON.parse(readFileSync(resolve(pluginPath, 'dist', 'manifest.json'), 'utf-8'));
	const bundleName = `${manifest.id}.js`;

	cpSync(
		resolve(pluginPath, 'dist', bundleName),
		resolve(distDir, manifest.id, bundleName),
	);

	const entry = JSON.parse(readFileSync(resolve(pluginPath, 'dist', 'registry-entry.json'), 'utf-8'));
	entry.bundle = `https://raw.githubusercontent.com/friction-box-project/box-plugins/main/dist/${manifest.id}/${bundleName}`;
	entry.verified = true;
	registryEntries.push(entry);
}

const registry = { version: 2, plugins: registryEntries };
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');

console.log(`\nUpdated registry.json with ${registryEntries.length} plugin(s).`);
