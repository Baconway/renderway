<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#snippet card()}
	<svg width="600" height="400">
		<rect width="600" height="400"></rect>

		<image x="0" y="0" width="600" href={data.cover?.custom_url}></image>

		<g
			><rect width="600" height="125" y="95"></rect>
			<rect
				x="9"
				y="59"
				width="130"
				height="130"
				fill={data.profile_color}
				clip-path="inset(0% round 6px)"
			></rect>
			<image
				x="10"
				y="60"
				width="128"
				height="128"
				href={data.avatar_url}
				clip-path="inset(0% round 6px)"
			></image>
			<text fill="white" x="200" y="125">{data.username}</text>
		</g>
	</svg>
{/snippet}

{@render card()}
