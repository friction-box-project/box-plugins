<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		flipped = false,
		matched = false,
		disabled = false,
		onclick,
		front,
		back,
	}: {
		flipped?: boolean;
		matched?: boolean;
		disabled?: boolean;
		onclick?: () => void;
		front: Snippet;
		back: Snippet;
	} = $props();
</script>

<button
	class="flip-card"
	class:flipped
	class:matched
	disabled={disabled}
	onclick={onclick}
	aria-label={flipped ? 'Card face up' : 'Card face down'}
>
	<div class="flip-card-inner">
		<div class="flip-card-front analog-card">
			{@render front()}
		</div>
		<div class="flip-card-back analog-card analog-card-back">
			{@render back()}
		</div>
	</div>
</button>

<style>
	.flip-card {
		perspective: 600px;
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		outline: none;
		will-change: transform;
		-webkit-tap-highlight-color: transparent;
	}

	.flip-card:disabled {
		cursor: default;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.flip-card.flipped .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card.matched .flip-card-inner {
		animation: analog-match-pulse 350ms ease;
	}

	.flip-card:not(:disabled):hover .flip-card-inner {
		box-shadow: var(--card-shadow-lifted);
		transform: translateY(-2px);
	}

	.flip-card:not(:disabled).flipped:hover .flip-card-inner {
		transform: rotateY(180deg) translateY(-2px);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		overflow: hidden;
	}

	.flip-card-front {
		transform: rotateY(180deg);
	}

	.flip-card.matched .flip-card-front {
		box-shadow: 0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent),
			var(--card-shadow);
	}
</style>
