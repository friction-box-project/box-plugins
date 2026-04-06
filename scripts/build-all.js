import { readdirSync, readFileSync, writeFileSync, existsSync, cpSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const pluginsDir = resolve(import.meta.dirname, '../plugins');
const distDir = resolve(import.meta.dirname, '../dist');
const registryPath = resolve(import.meta.dirname, '../registry.json');

function findPlugins(dir) {
	const entries = readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
	const found = [];
	for (const entry of entries) {
		const full = resolve(dir, entry.name);
		if (existsSync(resolve(full, 'plugin.config.ts'))) {
			found.push(full);
		} else {
			found.push(...findPlugins(full));
		}
	}
	return found;
}

const pluginPaths = findPlugins(pluginsDir);
const registryEntries = [];

for (const pluginPath of pluginPaths) {
	const name = pluginPath.replace(pluginsDir + '/', '');
	console.log(`\nBuilding ${name}...`);
	execSync('bunx frictionbox build --registry', { cwd: pluginPath, stdio: 'inherit' });

	const manifest = JSON.parse(readFileSync(resolve(pluginPath, 'dist', 'manifest.json'), 'utf-8'));
	const bundleName = `${manifest.id}.js`;

	cpSync(
		resolve(pluginPath, 'dist', bundleName),
		resolve(distDir, manifest.id, bundleName),
	);

	const entry = JSON.parse(readFileSync(resolve(pluginPath, 'dist', 'registry-entry.json'), 'utf-8'));
	entry.bundle = `https://raw.githubusercontent.com/ubox-project/box-plugins/main/dist/${manifest.id}/${bundleName}`;
	entry.verified = true;
	registryEntries.push(entry);
}

const registry = { version: 2, plugins: registryEntries };
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');

console.log(`\nUpdated registry.json with ${registryEntries.length} plugin(s).`);
