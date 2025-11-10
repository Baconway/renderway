<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	console.log(data);
</script>

{#snippet card()}
	<svg width="600" height="300">
		<rect x="0" y="0" width="250" height="250"></rect>
		<text fill="white" x="15" y="15">dqbyhuwdqhyuidhqyu</text>
	</svg>
{/snippet}

{@render card()}
