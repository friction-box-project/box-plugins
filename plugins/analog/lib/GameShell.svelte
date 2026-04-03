<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		phase,
		stats,
		lifetime,
		onAgain,
		onContinue,
		children,
	}: {
		phase: 'playing' | 'done';
		stats: { label: string; value: string }[];
		lifetime?: string;
		onAgain: () => void;
		onContinue: () => void;
		children: Snippet;
	} = $props();
</script>

{#if phase === 'playing'}
	{@render children()}
{:else}
	<div class="box-summary">
		<p class="box-summary-heading">Done</p>

		<div class="box-stat-grid">
			{#each stats as stat, i}
				<div class="box-stat-cell" style:animation-delay="{i * 80}ms">
					<span class="box-stat-num">{stat.value}</span>
					<span class="box-stat-tag">{stat.label}</span>
				</div>
			{/each}
		</div>

		{#if lifetime}
			<p class="box-lifetime">{lifetime}</p>
		{/if}

		<div class="box-results-actions">
			<button class="box-results-btn" onclick={onAgain}>Again</button>
			<button class="box-results-btn primary" onclick={onContinue}>Continue</button>
		</div>
	</div>
{/if}
