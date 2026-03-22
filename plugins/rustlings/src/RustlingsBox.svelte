<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { BoxContext } from '../../../shared/types';
	import {
		NODES, EDGES, EXERCISES, STARS, VIEWBOX,
		getNode, nodeStatus, nextAvailable, edgePath,
		type NodeId, type NodeStatus,
	} from './rustlings-tree';

	let { ctx }: { ctx: BoxContext } = $props();

	let completedIds = $state<string[]>([]);
	let activeNodeId = $state<NodeId | null>(null);
	let code = $state('');
	let output = $state<{ kind: 'success' | 'error'; text: string } | null>(null);
	let compiling = $state(false);
	let showHint = $state(false);
	let loaded = $state(false);
	let editorEl: HTMLTextAreaElement | undefined = $state();

	let completedSet = $derived(new Set(completedIds));
	let activeNode = $derived(activeNodeId ? getNode(activeNodeId) : null);
	let exercise = $derived(activeNodeId ? EXERCISES[activeNodeId] : null);
	let allDone = $derived(completedIds.length === NODES.length);

	function selectNode(id: NodeId) {
		activeNodeId = id;
		code = EXERCISES[id].starter;
		output = null;
		showHint = false;
		tick().then(() => editorEl?.focus());
	}

	function pickNext() {
		const id = nextAvailable(completedSet);
		if (id) selectNode(id);
		else activeNodeId = null;
	}

	function status(id: NodeId): NodeStatus {
		return nodeStatus(id, completedSet, activeNodeId);
	}

	async function runCode() {
		if (!exercise || compiling) return;
		compiling = true;
		output = null;

		await new Promise(r => setTimeout(r, 500));

		const pass = exercise.checks.every(c => code.includes(c));
		compiling = false;

		if (pass) {
			output = { kind: 'success', text: '✓ Compiles and runs successfully!' };
			completedIds = [...completedIds, activeNodeId!];
			await ctx.state.set('completed', completedIds);
			setTimeout(() => ctx.complete(), 1600);
		} else {
			output = { kind: 'error', text: '✗ Compilation failed. Check your code.' };
		}
	}

	function handleEditorKey(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			e.preventDefault();
			const el = e.currentTarget as HTMLTextAreaElement;
			const s = el.selectionStart;
			const end = el.selectionEnd;
			code = code.substring(0, s) + '    ' + code.substring(end);
			tick().then(() => { el.selectionStart = el.selectionEnd = s + 4; });
		}
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			runCode();
		}
	}

	function nodeClick(id: NodeId) {
		const s = status(id);
		if (s === 'available') selectNode(id);
	}

	function edgeStroke(fromId: NodeId, toId: NodeId): string {
		const fd = completedSet.has(fromId);
		const td = completedSet.has(toId);
		if (fd && td) return 'var(--r-edge-lit)';
		if (fd) return 'var(--r-edge-warm)';
		return 'var(--r-edge-dim)';
	}

	function edgeWidth(fromId: NodeId, toId: NodeId): number {
		return completedSet.has(fromId) && completedSet.has(toId) ? 1.5 : 0.6;
	}

	onMount(async () => {
		const saved = await ctx.state.get<string[]>('completed');
		if (saved) completedIds = saved;
		pickNext();
		loaded = true;
	});
</script>

{#if loaded}
<div class="rustlings">
	<div class="tree-panel">
		<div class="tree-head">
			<span class="tree-title">rustlings</span>
			<span class="tree-count">{completedIds.length}<span class="tree-count-sep">/</span>{NODES.length}</span>
		</div>

		<svg viewBox={VIEWBOX} class="tree-svg" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<filter id="gl" x="-80%" y="-80%" width="260%" height="260%">
					<feGaussianBlur in="SourceGraphic" stdDeviation="3" />
				</filter>
				<filter id="gl-active" x="-100%" y="-100%" width="300%" height="300%">
					<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
				</filter>
			</defs>

			{#each STARS as s}
				<circle cx={s.x} cy={s.y} r={s.r} fill="#c8beb0" opacity={s.o} />
			{/each}

			{#each EDGES as [fromId, toId]}
				<path
					d={edgePath(fromId, toId)}
					fill="none"
					stroke={edgeStroke(fromId, toId)}
					stroke-width={edgeWidth(fromId, toId)}
				/>
			{/each}

			{#each NODES as node}
				{@const st = status(node.id)}
				{@const r = node.milestone ? 7 : 4.5}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<g
					class="node-g"
					class:node-clickable={st === 'available'}
					onclick={() => nodeClick(node.id)}
				>
					{#if st === 'completed'}
						<circle cx={node.x} cy={node.y} r={r * 2.5} fill="var(--r-rust)" filter="url(#gl)" opacity="0.35" />
					{/if}
					{#if st === 'active'}
						<circle cx={node.x} cy={node.y} r={r * 3} fill="var(--r-rust)" filter="url(#gl-active)" class="halo" />
					{/if}

					<circle
						cx={node.x} cy={node.y} r={r}
						class="node-dot"
						class:node-completed={st === 'completed'}
						class:node-active={st === 'active'}
						class:node-available={st === 'available'}
						class:node-locked={st === 'locked'}
					/>

					<text
						x={node.x}
						y={node.y + r + 10}
						class="node-label"
						class:label-lit={st === 'completed' || st === 'active'}
						class:label-avail={st === 'available'}
						class:label-dim={st === 'locked'}
					>{node.label}</text>

					{#if node.milestone && st !== 'locked'}
						<text
							x={node.x}
							y={node.y + r + 20}
							class="node-chapter"
						>Ch. {node.chapter}</text>
					{/if}
				</g>
			{/each}
		</svg>

		<div class="tree-foot">
			<div class="progress-track">
				<div class="progress-fill" style:width="{(completedIds.length / NODES.length) * 100}%"></div>
			</div>
		</div>
	</div>

	<div class="exercise-panel">
		{#if allDone}
			<div class="done-state">
				<span class="done-crab">🦀</span>
				<h2 class="done-title">All exercises complete</h2>
				<p class="done-sub">You've covered the Rust fundamentals.</p>
				<button class="btn-primary" onclick={() => ctx.complete()}>Continue</button>
			</div>
		{:else if activeNode && exercise}
			<div class="ex-header">
				<span class="ch-badge">Ch. {activeNode.chapter}</span>
				<h2 class="ex-title">{exercise.title}</h2>
				<p class="ex-concept">{exercise.concept}</p>
			</div>

			<div class="editor-wrap">
				<div class="editor-chrome">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
					<span class="editor-filename">main.rs</span>
				</div>
				<textarea
					bind:this={editorEl}
					bind:value={code}
					class="editor"
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					onkeydown={handleEditorKey}
				></textarea>
			</div>

			{#if output}
				<div class="output" class:out-ok={output.kind === 'success'} class:out-err={output.kind === 'error'}>
					<pre>{output.text}</pre>
				</div>
			{/if}

			{#if showHint}
				<div class="hint-box">
					<span class="hint-label">hint</span>
					{exercise.hint}
				</div>
			{/if}

			<div class="action-bar">
				<button class="btn-ghost" onclick={() => showHint = !showHint}>
					{showHint ? 'Hide hint' : 'Hint'}
				</button>
				<div class="action-right">
					<button class="btn-ghost" onclick={() => ctx.complete()}>Skip</button>
					<button class="btn-primary" disabled={compiling} onclick={runCode}>
						{#if compiling}
							<span class="compile-spinner"></span> Compiling…
						{:else}
							▶ Run
						{/if}
					</button>
				</div>
			</div>

			<div class="shortcut-hint">Ctrl+Enter to run</div>
		{/if}
	</div>
</div>
{/if}

<style>
	.rustlings {
		--r-rust: #CE422B;
		--r-rust-dim: #8a4030;
		--r-warm: #D4956A;
		--r-bg: #060606;
		--r-panel: #0b0b0b;
		--r-surface: #111;
		--r-border: rgba(255, 255, 255, 0.06);
		--r-text: #d0c8c0;
		--r-text-dim: #555;
		--r-edge-lit: rgba(206, 66, 43, 0.4);
		--r-edge-warm: rgba(206, 66, 43, 0.12);
		--r-edge-dim: rgba(255, 255, 255, 0.03);

		position: fixed;
		inset: 0;
		display: flex;
		background: var(--r-bg);
		color: var(--r-text);
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
		font-weight: 400;
		overflow: hidden;
	}

	/* ── tree panel ── */

	.tree-panel {
		width: 240px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #080808 0%, #050505 100%);
		border-right: 1px solid var(--r-border);
	}

	.tree-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 18px 8px;
	}

	.tree-title {
		font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
		font-size: 13px;
		font-weight: 600;
		color: var(--r-rust);
		letter-spacing: 0.04em;
	}

	.tree-count {
		font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
		font-size: 11px;
		color: var(--r-text-dim);
		font-variant-numeric: tabular-nums;
	}

	.tree-count-sep {
		opacity: 0.4;
		margin: 0 1px;
	}

	.tree-svg {
		flex: 1;
		width: 100%;
		padding: 0 8px;
	}

	.tree-foot {
		padding: 12px 18px 16px;
	}

	.progress-track {
		height: 2px;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 1px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--r-rust);
		border-radius: 1px;
		transition: width 600ms ease;
	}

	/* ── svg nodes ── */

	.node-g { cursor: default; }
	.node-clickable { cursor: pointer; }

	.node-dot {
		transition: fill 400ms ease, stroke 400ms ease;
	}

	.node-completed {
		fill: var(--r-rust);
		stroke: var(--r-rust);
		stroke-width: 1;
	}

	.node-active {
		fill: var(--r-rust);
		stroke: var(--r-warm);
		stroke-width: 1.5;
	}

	.node-available {
		fill: none;
		stroke: var(--r-rust-dim);
		stroke-width: 1;
	}

	.node-locked {
		fill: rgba(255, 255, 255, 0.03);
		stroke: rgba(255, 255, 255, 0.05);
		stroke-width: 0.5;
	}

	.halo {
		animation: pulse 2.4s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.15; }
		50% { opacity: 0.45; }
	}

	.node-label {
		font-family: 'IBM Plex Sans', system-ui, sans-serif;
		font-size: 6.5px;
		text-anchor: middle;
		fill: var(--r-text-dim);
		transition: fill 400ms ease;
	}

	.label-lit { fill: var(--r-text); }
	.label-avail { fill: var(--r-rust-dim); }
	.label-dim { fill: rgba(255, 255, 255, 0.08); }

	.node-chapter {
		font-family: 'JetBrains Mono', monospace;
		font-size: 4.5px;
		text-anchor: middle;
		fill: var(--r-text-dim);
		opacity: 0.5;
	}

	/* ── exercise panel ── */

	.exercise-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 32px 40px;
		overflow-y: auto;
		min-width: 0;
	}

	.ex-header {
		margin-bottom: 20px;
	}

	.ch-badge {
		display: inline-block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		font-weight: 500;
		color: var(--r-rust);
		background: rgba(206, 66, 43, 0.08);
		border: 1px solid rgba(206, 66, 43, 0.15);
		border-radius: 4px;
		padding: 2px 8px;
		margin-bottom: 10px;
		letter-spacing: 0.03em;
	}

	.ex-title {
		font-size: 22px;
		font-weight: 600;
		color: #eee;
		margin: 0 0 8px;
		letter-spacing: -0.01em;
	}

	.ex-concept {
		font-size: 13px;
		color: var(--r-text-dim);
		margin: 0;
		line-height: 1.6;
		max-width: 520px;
	}

	/* ── code editor ── */

	.editor-wrap {
		flex: 1;
		min-height: 180px;
		max-height: 360px;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--r-border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--r-surface);
	}

	.editor-chrome {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid var(--r-border);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.dot.red { background: #ff5f57; opacity: 0.6; }
	.dot.yellow { background: #febc2e; opacity: 0.6; }
	.dot.green { background: #28c840; opacity: 0.6; }

	.editor-filename {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--r-text-dim);
		margin-left: 8px;
	}

	.editor {
		flex: 1;
		width: 100%;
		padding: 14px 16px;
		background: transparent;
		color: #c8c0b8;
		font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
		font-size: 13px;
		line-height: 1.65;
		border: none;
		outline: none;
		resize: none;
		tab-size: 4;
	}

	.editor::selection {
		background: rgba(206, 66, 43, 0.25);
	}

	/* ── output ── */

	.output {
		margin-top: 10px;
		padding: 10px 14px;
		border-radius: 6px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		line-height: 1.5;
	}

	.output pre {
		margin: 0;
		white-space: pre-wrap;
	}

	.out-ok {
		background: rgba(40, 200, 64, 0.06);
		border: 1px solid rgba(40, 200, 64, 0.15);
		color: #5cdb6a;
	}

	.out-err {
		background: rgba(206, 66, 43, 0.06);
		border: 1px solid rgba(206, 66, 43, 0.15);
		color: var(--r-rust);
	}

	.hint-box {
		margin-top: 8px;
		padding: 10px 14px;
		border-radius: 6px;
		background: rgba(212, 149, 106, 0.05);
		border: 1px solid rgba(212, 149, 106, 0.12);
		font-size: 12px;
		color: var(--r-warm);
		line-height: 1.5;
	}

	.hint-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-right: 8px;
		opacity: 0.6;
	}

	/* ── action bar ── */

	.action-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;
		gap: 8px;
	}

	.action-right {
		display: flex;
		gap: 8px;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 20px;
		background: var(--r-rust);
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 150ms ease, opacity 150ms ease;
	}

	.btn-primary:hover { background: #b8371f; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

	.btn-ghost {
		padding: 8px 14px;
		background: transparent;
		color: var(--r-text-dim);
		border: 1px solid var(--r-border);
		border-radius: 6px;
		font-size: 12px;
		cursor: pointer;
		transition: color 150ms ease, border-color 150ms ease;
	}

	.btn-ghost:hover {
		color: var(--r-text);
		border-color: rgba(255, 255, 255, 0.12);
	}

	.compile-spinner {
		display: inline-block;
		width: 12px;
		height: 12px;
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.shortcut-hint {
		margin-top: 10px;
		font-size: 10px;
		color: var(--r-text-dim);
		opacity: 0.4;
		font-family: 'JetBrains Mono', monospace;
	}

	/* ── done state ── */

	.done-state {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 12px;
	}

	.done-crab {
		font-size: 48px;
		margin-bottom: 8px;
	}

	.done-title {
		font-size: 24px;
		font-weight: 600;
		color: #eee;
		margin: 0;
	}

	.done-sub {
		font-size: 14px;
		color: var(--r-text-dim);
		margin: 0;
	}

	/* ── mobile ── */

	@media (max-width: 640px) {
		.tree-panel { display: none; }

		.exercise-panel {
			padding: 24px 20px;
		}

		.editor-wrap {
			max-height: 280px;
		}
	}
</style>
