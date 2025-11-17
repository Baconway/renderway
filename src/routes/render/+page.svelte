<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#snippet card()}
	<svg width="600" height="400">
		<rect width="600" height="400" fill={data.card_color}></rect>

		<image x="0" y="0" width="600" href={data.cover?.custom_url}></image>

		<g>
			<g>
				<rect width="600" height="110" y="55" fill={data.profile_color}></rect>
				<!--<rect
					x="8.5"
					y="58.5"
					width="103"
					height="103"
					fill={data.profile_color}
					clip-path="inset(0% round 6px)"
				></rect>-->
				<image
					x="10"
					y="60"
					width="100"
					height="100"
					href={data.avatar_url}
					clip-path="inset(0% round 6px)"
				></image>
			</g>
			<g>
				<!--username, country, rank, peak rank-->

				<text fill="white" x="135" y="90" font-size="25">{data.username}</text>
				<image
					width="30"
					height="20"
					x="136"
					y="100"
					href={data.flag}
					clip-path="inset(0% round 3px)"
				></image>
				<text fill="white" x="175" y="117" font-size="18">{data.country}</text>
			</g>
		</g>
	</svg>
{/snippet}

{@render card()}
