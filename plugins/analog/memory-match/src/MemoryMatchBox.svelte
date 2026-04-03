<script lang="ts">
	import { onMount } from 'svelte';
	import type { BoxContext } from '@open-friction/sdk';
	import { hydrateState, shuffle } from '@open-friction/sdk';
	import FlipCard from '../../lib/FlipCard.svelte';
	import GameShell from '../../lib/GameShell.svelte';
	import { formatTime, formatStat } from '../../lib/format';
	import { pickSymbols, getGridLayout } from './symbols';
	import '../../lib/analog-theme.css';

	let { ctx }: { ctx: BoxContext } = $props();

	let pairs = $derived(parseInt(ctx.settings.pairs as string, 10) || 6);
	let layout = $derived(getGridLayout(pairs));

	type Card = { id: number; symbol: string; flipped: boolean; matched: boolean };
	type Stats = { totalCompletions: number; bestTimeMs: number | null; bestMoves: number | null; totalPairsFound: number };

	let cards = $state<Card[]>([]);
	let flippedIndices = $state<number[]>([]);
	let moves = $state(0);
	let matchedCount = $state(0);
	let startTime = $state(0);
	let elapsedMs = $state(0);
	let phase = $state<'playing' | 'done'>('playing');
	let lockBoard = $state(false);
	let stats = $state<Stats>({ totalCompletions: 0, bestTimeMs: null, bestMoves: null, totalPairsFound: 0 });

	$effect(() => {
		if (phase !== 'playing') return;
		const id = setInterval(() => {
			elapsedMs = Date.now() - startTime;
		}, 100);
		return () => clearInterval(id);
	});

	function reset() {
		const symbols = pickSymbols(pairs);
		const deck = shuffle([...symbols, ...symbols]).map((symbol, i) => ({
			id: i,
			symbol,
			flipped: false,
			matched: false,
		}));
		cards = deck;
		flippedIndices = [];
		moves = 0;
		matchedCount = 0;
		startTime = Date.now();
		elapsedMs = 0;
		phase = 'playing';
		lockBoard = false;
	}

	function flipCard(i: number) {
		if (lockBoard) return;
		if (cards[i].flipped || cards[i].matched) return;
		if (flippedIndices.length >= 2) return;

		cards[i].flipped = true;
		const next = [...flippedIndices, i];
		flippedIndices = next;

		if (next.length === 2) {
			moves++;
			const [a, b] = next;
			if (cards[a].symbol === cards[b].symbol) {
				cards[a].matched = true;
				cards[b].matched = true;
				matchedCount++;
				flippedIndices = [];
				if (matchedCount >= pairs) {
					finish();
				}
			} else {
				lockBoard = true;
				setTimeout(() => {
					cards[a].flipped = false;
					cards[b].flipped = false;
					flippedIndices = [];
					lockBoard = false;
				}, 800);
			}
		}
	}

	function finish() {
		elapsedMs = Date.now() - startTime;
		stats.totalCompletions++;
		stats.totalPairsFound += pairs;
		if (stats.bestTimeMs == null || elapsedMs < stats.bestTimeMs) {
			stats.bestTimeMs = elapsedMs;
		}
		if (stats.bestMoves == null || moves < stats.bestMoves) {
			stats.bestMoves = moves;
		}
		stats = { ...stats };
		ctx.state.set('memory-stats', stats);
		phase = 'done';
	}

	let summaryStats = $derived([
		{ label: 'time', value: formatTime(elapsedMs) },
		{ label: 'moves', value: String(moves) },
		{ label: 'best time', value: stats.bestTimeMs != null ? formatTime(stats.bestTimeMs) : '\u2014' },
		{ label: 'best moves', value: formatStat(stats.bestMoves) },
	]);

	let lifetimeText = $derived(
		`${stats.totalCompletions} game${stats.totalCompletions === 1 ? '' : 's'} \u00b7 ${stats.totalPairsFound} pairs found`
	);

	onMount(async () => {
		stats = await hydrateState(ctx, 'memory-stats', {
			totalCompletions: 0,
			bestTimeMs: null,
			bestMoves: null,
			totalPairsFound: 0,
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
			<div class="game-header">
				<span class="box-label">{formatTime(elapsedMs, 'clock')}</span>
				<span class="box-label">{matchedCount}/{pairs} pairs</span>
			</div>

			<div
				class="game-grid"
				style:grid-template-columns="repeat({layout.cols}, 1fr)"
				style:max-width="{layout.cols * 80 + (layout.cols - 1) * 8}px"
			>
				{#each cards as card, i (card.id)}
					<FlipCard
						flipped={card.flipped || card.matched}
						matched={card.matched}
						disabled={lockBoard || card.matched}
						onclick={() => flipCard(i)}
					>
						{#snippet front()}
							<span class="card-symbol">{card.symbol}</span>
						{/snippet}
						{#snippet back()}
							<span class="card-back-mark">?</span>
						{/snippet}
					</FlipCard>
				{/each}
			</div>

			<p class="box-meta">
				{moves} move{moves === 1 ? '' : 's'}
			</p>
		{/snippet}
	</GameShell>
</div>

<style>
	.game-header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 520px;
	}

	.game-grid {
		display: grid;
		gap: 8px;
		width: 100%;
		justify-content: center;
	}

	.game-grid :global(.flip-card) {
		aspect-ratio: 3 / 4;
		width: 100%;
		min-width: 0;
	}

	.game-grid :global(.flip-card-front),
	.game-grid :global(.flip-card-back) {
		width: 100%;
		height: 100%;
	}

	.card-symbol {
		font-size: clamp(1.4rem, 4vw, 2.2rem);
		line-height: 1;
		user-select: none;
	}

	.card-back-mark {
		font-size: 1.4rem;
		font-weight: 300;
		color: color-mix(in srgb, var(--accent, #8a9bb8) 50%, transparent);
		user-select: none;
	}
</style>
