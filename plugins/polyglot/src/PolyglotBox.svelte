<script lang="ts">
	import { onMount } from 'svelte';
	import type { BoxContext, ResponseSchema } from '$shared/types';

	let { ctx }: { ctx: BoxContext } = $props();

	type ProblemKind = 'output';

	type Problem = {
		kind: ProblemKind;
		language: string;
		concept: string;
		code: string;
		answer: string;
		explanation: string;
	};

	type Phase = 'loading' | 'answering' | 'result';

	type Stats = {
		tiers: Record<string, number>;
		totalCorrect: number;
		totalIncorrect: number;
	};

	const LANGS: Record<string, { display: string; color: string }> = {
		python:     { display: 'Python',     color: '#3572A5' },
		javascript: { display: 'JavaScript', color: '#F0DB4F' },
		typescript: { display: 'TypeScript', color: '#3178C6' },
		rust:       { display: 'Rust',       color: '#CE422B' },
		go:         { display: 'Go',         color: '#00ADD8' },
		java:       { display: 'Java',       color: '#B07219' },
		c:          { display: 'C',          color: '#A8B9CC' },
		ruby:       { display: 'Ruby',       color: '#CC342D' },
	};

	const DEFAULTS: Stats = { tiers: {}, totalCorrect: 0, totalIncorrect: 0 };

	const SCHEMA: ResponseSchema = {
		name: 'coding_problem',
		schema: {
			type: 'object',
			properties: {
				concept: { type: 'string' },
				code: { type: 'string' },
				answer: { type: 'string' },
				explanation: { type: 'string' },
			},
			required: ['concept', 'code', 'answer', 'explanation'],
			additionalProperties: false,
		},
	};

	let enabledLangs = $derived(
		Object.keys(LANGS).filter(l => ctx.settings[l] !== false)
	);
	let focus = $derived(
		typeof ctx.settings.focus === 'string' ? ctx.settings.focus : 'mixed'
	);

	let stats = $state<Stats>({ ...DEFAULTS });
	let problem = $state<Problem | null>(null);
	let phase = $state<Phase>('loading');
	let userAnswer = $state('');
	let answerCorrect = $state<boolean | null>(null);
	let startTime = $state(0);
	let prevTier = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	let langMeta = $derived(problem ? LANGS[problem.language] : null);
	let langColor = $derived(langMeta?.color ?? '#666');
	let currentTier = $derived(problem ? tierFor(problem.language) : 0);

	function tierFor(lang: string): number {
		return stats.tiers[lang] ?? 3;
	}

	function adjustTier(lang: string, correct: boolean, fast: boolean) {
		let t = tierFor(lang);
		if (correct) {
			t += fast ? 2 : 1;
		} else {
			t -= 1;
		}
		stats.tiers = { ...stats.tiers, [lang]: Math.max(1, Math.min(10, t)) };
		if (correct) stats.totalCorrect++;
		else stats.totalIncorrect++;
		stats = { ...stats };
		ctx.state.set('polyglot-stats', stats);
	}

	async function generateProblem() {
		phase = 'loading';
		problem = null;
		userAnswer = '';
		answerCorrect = null;

		const langs = enabledLangs.length > 0 ? enabledLangs : ['python'];
		const lang = langs[Math.floor(Math.random() * langs.length)];
		const tier = tierFor(lang);
		const meta = LANGS[lang];

		const system = `You generate "What does this print?" programming challenges.

TIER ${tier}/10:
1-3: Basic syntax — variables, arithmetic, string ops, simple loops
4-6: Language features — closures, iterators, type system, standard library
7-8: Edge cases — coercion, scoping gotchas, subtle behaviors
9-10: Expert — obscure spec behavior, complex feature interactions

RULES:
- Self-contained ${meta.display} code, 3-12 lines, no comments
- Exactly one print/output statement producing the answer
- Output must be a single line
- Answer: exactly what gets printed (visible text only)
- Concept: 2-5 word name for the feature tested
- Explanation: 2-3 sentences teaching WHY
- VERIFY your answer by tracing execution step by step`;

		const prompt = `Generate a ${focus} problem for ${meta.display} at tier ${tier}.`;

		type LLMProblem = { concept: string; code: string; answer: string; explanation: string };
		const result = await ctx.ai.generateJson<LLMProblem>(system, prompt, SCHEMA, {
			maxTokens: 400,
			timeoutMs: 10000,
		});

		if (!result?.code || !result?.answer) return;

		problem = {
			kind: 'output',
			language: lang,
			concept: result.concept,
			code: result.code,
			answer: result.answer,
			explanation: result.explanation,
		};
		phase = 'answering';
		startTime = Date.now();
		setTimeout(() => inputEl?.focus(), 50);
	}

	function submit() {
		if (!problem || phase !== 'answering') return;
		prevTier = tierFor(problem.language);
		const correct = userAnswer.trim() === problem.answer.trim();
		answerCorrect = correct;
		adjustTier(problem.language, correct, Date.now() - startTime < 30000);
		phase = 'result';
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') submit();
	}

	onMount(async () => {
		const saved = await ctx.state.get<Stats>('polyglot-stats');
		if (saved) stats = { ...DEFAULTS, ...saved };
		generateProblem();
	});
</script>

<div class="polyglot" style:--lang={langColor}>
	{#if phase === 'loading'}
		<div class="center-state">
			<div class="spinner"></div>
			<p class="loading-text">Generating problem…</p>
		</div>
	{:else if problem}
		<div class="content">
			<div class="header">
				<div class="lang-badge">
					<span class="lang-dot"></span>
					<span class="lang-name">{langMeta?.display}</span>
					<span class="tier-pill">Lv. {currentTier}</span>
				</div>
				{#if phase === 'result' && prevTier !== currentTier}
					<span class="tier-delta" class:up={currentTier > prevTier} class:down={currentTier < prevTier}>
						{prevTier} → {currentTier}
					</span>
				{/if}
			</div>

			<div class="code-block">
				<pre><code>{problem.code}</code></pre>
			</div>

			{#if phase === 'answering'}
				<p class="prompt-text">What does this print?</p>
				<div class="answer-row">
					<input
						bind:this={inputEl}
						bind:value={userAnswer}
						type="text"
						class="answer-input"
						placeholder="…"
						autocomplete="off"
						spellcheck="false"
						onkeydown={onKeydown}
					/>
					<button class="btn-run" onclick={submit}>Submit</button>
				</div>
				<button class="btn-skip" onclick={() => ctx.complete()}>Skip</button>
			{:else}
				<div class="result" class:ok={answerCorrect} class:fail={!answerCorrect}>
					<span class="result-icon">{answerCorrect ? '✓' : '✗'}</span>
					<span class="result-word">{answerCorrect ? 'Correct' : 'Not quite'}</span>
				</div>

				{#if !answerCorrect}
					<div class="diff">
						<div class="diff-row">
							<span class="diff-label">Expected</span>
							<code class="diff-val">{problem.answer}</code>
						</div>
						<div class="diff-row">
							<span class="diff-label">Yours</span>
							<code class="diff-val yours">{userAnswer || '(empty)'}</code>
						</div>
					</div>
				{/if}

				<div class="explanation">
					<span class="concept">{problem.concept}</span>
					<p>{problem.explanation}</p>
				</div>

				<div class="actions">
					<button class="btn-ghost" onclick={generateProblem}>Next problem</button>
					<button class="btn-run" onclick={() => ctx.complete()}>Continue</button>
				</div>
			{/if}

			<p class="footer-stats">
				{stats.totalCorrect} correct · {stats.totalIncorrect} incorrect
			</p>
		</div>
	{/if}
</div>

<style>
	.polyglot {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #080808;
		color: #c8c0b8;
		font-family: 'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;
		overflow-y: auto;
	}

	.center-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.spinner {
		width: 22px;
		height: 22px;
		border: 2px solid rgba(255, 255, 255, 0.08);
		border-top-color: var(--lang, #666);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }

	.loading-text {
		font-size: 13px;
		color: #444;
		margin: 0;
	}

	.content {
		width: 100%;
		max-width: 540px;
		padding: 40px 28px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.lang-badge {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.lang-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--lang);
		box-shadow: 0 0 6px color-mix(in srgb, var(--lang) 40%, transparent);
	}

	.lang-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--lang);
	}

	.tier-pill {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 10px;
		color: #555;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		padding: 2px 8px;
		border-radius: 4px;
	}

	.tier-delta {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		font-weight: 500;
	}

	.tier-delta.up { color: #4caf50; }
	.tier-delta.down { color: #ce422b; }

	/* ── code block ── */

	.code-block {
		background: #0c0c0c;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-left: 3px solid var(--lang);
		border-radius: 8px;
		overflow: hidden;
	}

	.code-block pre {
		margin: 0;
		padding: 18px 20px;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
		font-size: 13px;
		line-height: 1.7;
		color: #bbb5ad;
	}

	/* ── answering ── */

	.prompt-text {
		font-size: 13px;
		color: #555;
		margin: 4px 0 0;
	}

	.answer-row {
		display: flex;
		gap: 8px;
	}

	.answer-input {
		flex: 1;
		background: #0c0c0c;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 6px;
		color: #e0e0e0;
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		padding: 10px 14px;
		outline: none;
		transition: border-color 150ms ease;
	}

	.answer-input:focus {
		border-color: var(--lang);
	}

	.answer-input::placeholder {
		color: #333;
	}

	.btn-run {
		padding: 10px 20px;
		background: var(--lang);
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 150ms ease;
		flex-shrink: 0;
	}

	.btn-run:hover { opacity: 0.85; }

	.btn-skip {
		align-self: flex-start;
		background: none;
		border: none;
		color: #444;
		font-size: 11px;
		cursor: pointer;
		padding: 0;
		transition: color 150ms ease;
	}

	.btn-skip:hover { color: #888; }

	/* ── result ── */

	.result {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-radius: 8px;
	}

	.result.ok {
		background: rgba(76, 175, 80, 0.06);
		border: 1px solid rgba(76, 175, 80, 0.12);
	}

	.result.fail {
		background: rgba(206, 66, 43, 0.06);
		border: 1px solid rgba(206, 66, 43, 0.12);
	}

	.result-icon { font-size: 16px; }
	.result.ok .result-icon { color: #4caf50; }
	.result.fail .result-icon { color: #ce422b; }

	.result-word { font-weight: 600; font-size: 14px; }
	.result.ok .result-word { color: #4caf50; }
	.result.fail .result-word { color: #ce422b; }

	.diff {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 14px;
		background: rgba(255, 255, 255, 0.015);
		border-radius: 6px;
	}

	.diff-row {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	.diff-label {
		font-size: 9px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #444;
		width: 56px;
		flex-shrink: 0;
	}

	.diff-val {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: #aaa;
	}

	.diff-val.yours {
		color: #666;
		text-decoration: line-through;
		text-decoration-color: rgba(206, 66, 43, 0.3);
	}

	.explanation {
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: 8px;
	}

	.concept {
		font-size: 11px;
		font-weight: 600;
		color: var(--lang);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.explanation p {
		margin: 6px 0 0;
		font-size: 13px;
		color: #777;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}

	.btn-ghost {
		padding: 10px 16px;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 6px;
		color: #666;
		font-size: 12px;
		cursor: pointer;
		transition: color 150ms ease, border-color 150ms ease;
	}

	.btn-ghost:hover {
		color: #aaa;
		border-color: rgba(255, 255, 255, 0.12);
	}

	.footer-stats {
		font-size: 10px;
		color: #2a2a2a;
		text-align: center;
		margin: 8px 0 0;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 480px) {
		.content { padding: 24px 16px; }
	}
</style>
