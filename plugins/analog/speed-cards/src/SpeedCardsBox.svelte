<script lang="ts">
	import { onMount } from 'svelte';
	import type { BoxContext } from '@open-friction/sdk';
	import { hydrateState, shuffle } from '@open-friction/sdk';
	import FlipCard from '../../lib/FlipCard.svelte';
	import GameShell from '../../lib/GameShell.svelte';
	import { formatTime, formatStat } from '../../lib/format';
	import { drawCards, type DeckType } from './deck';
	import '../../lib/analog-theme.css';

	let { ctx }: { ctx: BoxContext } = $props();

	let length = $derived(parseInt(ctx.settings.length as string, 10) || 4);
	let showTimeMs = $derived(parseInt(ctx.settings.showTimeMs as string, 10) || 1000);
	let deck = $derived((ctx.settings.deck as DeckType) || 'emoji');

	type Stats = {
		totalCompletions: number;
		totalPerfect: number;
		bestStreak: number;
		longestSequence: number;
	};

	let sequence = $state<string[]>([]);
	let scrambled = $state<{ symbol: string; seqIndex: number }[]>([]);
	let showIndex = $state(-1);
	let stage = $state<'watch' | 'recall' | 'result'>('watch');
	let phase = $state<'playing' | 'done'>('playing');
	let picked = $state<number[]>([]);
	let results = $state<('correct' | 'wrong' | null)[]>([]);
	let nextExpected = $state(0);
	let startTime = $state(0);
	let elapsedMs = $state(0);
	let streak = $state(0);
	let stats = $state<Stats>({ totalCompletions: 0, totalPerfect: 0, bestStreak: 0, longestSequence: 0 });

	function reset() {
		sequence = drawCards(deck, length);
		scrambled = shuffle(sequence.map((symbol, i) => ({ symbol, seqIndex: i })));
		showIndex = -1;
		stage = 'watch';
		phase = 'playing';
		picked = [];
		results = [];
		nextExpected = 0;
		streak = 0;
		startShowSequence();
	}

	function startShowSequence() {
		showIndex = 0;
		const interval = setInterval(() => {
			showIndex++;
			if (showIndex >= sequence.length) {
				clearInterval(interval);
				setTimeout(() => {
					showIndex = -1;
					stage = 'recall';
					startTime = Date.now();
				}, showTimeMs);
			}
		}, showTimeMs);
	}

	$effect(() => {
		if (stage !== 'recall') return;
		const id = setInterval(() => {
			elapsedMs = Date.now() - startTime;
		}, 100);
		return () => clearInterval(id);
	});

	function pickCard(scrambledIndex: number) {
		if (stage !== 'recall') return;
		if (picked.includes(scrambledIndex)) return;

		const card = scrambled[scrambledIndex];
		picked = [...picked, scrambledIndex];

		if (card.seqIndex === nextExpected) {
			results = [...results, 'correct'];
			streak++;
			nextExpected++;
		} else {
			results = [...results, 'wrong'];
			streak = 0;
		}

		if (picked.length >= sequence.length) {
			finish();
		}
	}

	function finish() {
		elapsedMs = Date.now() - startTime;
		stage = 'result';

		const correct = results.filter(r => r === 'correct').length;
		const perfect = correct === sequence.length;

		stats.totalCompletions++;
		if (perfect) stats.totalPerfect++;
		if (streak > stats.bestStreak) stats.bestStreak = streak;
		if (perfect && sequence.length > stats.longestSequence) {
			stats.longestSequence = sequence.length;
		}
		stats = { ...stats };
		ctx.state.set('speed-cards-stats', stats);

		setTimeout(() => {
			phase = 'done';
		}, 1200);
	}

	let correct = $derived(results.filter(r => r === 'correct').length);

	let summaryStats = $derived([
		{ label: 'correct', value: `${correct}/${sequence.length}` },
		{ label: 'time', value: formatTime(elapsedMs) },
		{ label: 'best streak', value: formatStat(stats.bestStreak) },
		{ label: 'longest perfect', value: stats.longestSequence > 0 ? `${stats.longestSequence} cards` : '\u2014' },
	]);

	let lifetimeText = $derived(
		`${stats.totalCompletions} round${stats.totalCompletions === 1 ? '' : 's'} \u00b7 ${stats.totalPerfect} perfect`
	);

	onMount(async () => {
		stats = await hydrateState(ctx, 'speed-cards-stats', {
			totalCompletions: 0,
			totalPerfect: 0,
			bestStreak: 0,
			longestSequence: 0,
		});
		reset();
	});
</script>

<div class="box-container analog-paper">
	<GameShell
		{phase}
		stats={summaryStats}
		lifetime={lifetimeText}
		onAgain={reset}
		onContinue={() => ctx.complete({ outcome: 'completed' })}
	>
		{#snippet children()}
			{#if stage === 'watch'}
				<p class="box-label stage-label">Watch the sequence</p>
				<div class="card-row">
					{#each sequence as symbol, i (i)}
						<FlipCard
							flipped={i === showIndex}
							disabled={true}
						>
							{#snippet front()}
								<span class="card-symbol">{symbol}</span>
							{/snippet}
							{#snippet back()}
								<span class="card-index">{i + 1}</span>
							{/snippet}
						</FlipCard>
					{/each}
				</div>
				<p class="box-meta">{Math.max(0, showIndex + 1)} / {sequence.length}</p>
			{:else}
				<div class="recall-header">
					<span class="box-label">Tap in order: {nextExpected + 1} of {sequence.length}</span>
					<span class="box-label">{formatTime(elapsedMs, 'clock')}</span>
				</div>
				<div class="card-row">
					{#each scrambled as card, i (card.seqIndex)}
						{@const pickIndex = picked.indexOf(i)}
						{@const isPicked = pickIndex >= 0}
						{@const result = isPicked ? results[pickIndex] : null}
						<button
							class="recall-card analog-card"
							class:picked={isPicked}
							class:correct={result === 'correct'}
							class:wrong={result === 'wrong'}
							disabled={stage === 'result' || isPicked}
							onclick={() => pickCard(i)}
						>
							<span class="card-symbol">{card.symbol}</span>
							{#if isPicked}
								<span class="pick-order" class:wrong={result === 'wrong'}>{pickIndex + 1}</span>
							{/if}
						</button>
					{/each}
				</div>
				<p class="box-meta">
					{picked.length} / {sequence.length} picked
				</p>
			{/if}
		{/snippet}
	</GameShell>
</div>

<style>
	.stage-label {
		text-align: center;
		animation: fade-in 300ms ease;
	}

	.recall-header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 520px;
	}

	.card-row {
		display: flex;
		gap: 8px;
		justify-content: center;
		flex-wrap: wrap;
		max-width: 520px;
		width: 100%;
	}

	.card-row :global(.flip-card) {
		width: 64px;
		height: 88px;
		flex-shrink: 0;
	}

	.card-row :global(.flip-card-front),
	.card-row :global(.flip-card-back) {
		width: 100%;
		height: 100%;
	}

	.card-symbol {
		font-size: clamp(1.4rem, 4vw, 2rem);
		line-height: 1;
		user-select: none;
		transition: color 200ms;
	}

	.card-index {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted, #808080);
		user-select: none;
	}

	.recall-card {
		width: 64px;
		height: 88px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		cursor: pointer;
		transition: opacity 200ms, transform 200ms;
		-webkit-tap-highlight-color: transparent;
	}

	.recall-card:not(:disabled):hover {
		transform: translateY(-2px);
		box-shadow: var(--card-shadow-lifted);
	}

	.recall-card.picked {
		opacity: 0.5;
		cursor: default;
	}

	.recall-card.correct {
		box-shadow: 0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent), var(--card-shadow);
	}

	.recall-card.wrong {
		box-shadow: 0 0 12px color-mix(in srgb, var(--box-wrong, #bf4f4f) 30%, transparent), var(--card-shadow);
	}

	.recall-card.wrong .card-symbol {
		color: var(--box-wrong, #bf4f4f);
	}

	.pick-order {
		position: absolute;
		bottom: 4px;
		right: 6px;
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--text-secondary, #a0a0a0);
		opacity: 0.7;
	}

	.pick-order.wrong {
		color: var(--box-wrong, #bf4f4f);
	}

	@keyframes fade-in {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
