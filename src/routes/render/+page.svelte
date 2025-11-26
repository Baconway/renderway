<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svg width="600" height="400">
	<!--card bg, cover-->
	<g>
		<rect width="600" height="340" rx="10" ry="10" fill={data.card_color}></rect>

		<image x="0" y="0" width="600" clip-path="inset(0% round 10px)" href={data.cover?.custom_url}
		></image>
	</g>
	<g>
		<!--profile bg, avatar-->
		<g>
			<rect width="600" height="110" y="55" fill={data.profile_color}></rect>
			<image
				x="10"
				y="60"
				width="100"
				height="100"
				href={data.avatar_url}
				clip-path="inset(0% round 6px)"
			></image>
		</g>
		<!--username, country, rank, peak rank-->
		<g>
			<text fill="white" x="135" y="90" font-size="25">{data.username}</text>
			<image width="30" height="20" x="255" y="75" href={data.flag} clip-path="inset(0% round 3px)"
			></image>
			<image
				width="40"
				height="20"
				x="290"
				y="75"
				href={data.teamFlag}
				clip-path="inset(0% round 3px)"
			></image>
			<text x="135" y="125" fill="white">Global Rank</text>
			<text x="135" y="150" fill="white" font-size="23">#{data.currentRank}</text>
			<text x="250" y="125" fill="white">Peak Rank</text>
			<text x="250" y="150" fill="white" font-size="23">#{data.peakRank}</text>
		</g>
		<!--gamemode, social media, total pp-->
		<g>
			<image x="375" y="75" width="20" height="20" href="/mode/mode-{data.modeRendering}.png"
			></image>
			<text x="400" y="89.5" font-size="15" fill="white">{data.modeName}</text>
			<image class="invert" x="375" y="105" width="20" height="20" href="/discord.svg"></image>
			<text x="400" y="120" font-size="15" fill="white">{data.discord}</text>
			<text x="375" y="150" fill="white" font-size="18">{data.pp} pp</text>
		</g>
		<!--top play, level, playtime-->
		<g>
			<text x="25" y="200" font-size="18" fill="white">Level: {data.level}</text>
			<text x="25" y="230" font-size="18" fill="white">Playtime: </text>
			<text x="25" y="255" font-size="18" fill="white">{data.playtime} hours</text>
			<text x="25" y="285" font-size="18" fill="white">Top Play:</text>
			<text x="25" y="310" font-size="18" fill="white">{data.bestPlay} pp</text>
		</g>
	</g>
	<!--dan achievements-->
	<g>
		<text x="125" y="195" font-size="18" fill="white">4K Achievements: </text>
		<text x="150" y="225" font-size="18" fill="white">Reformed Dan: </text>
		<image width="25" height="25" x="272" y="206" href={data.danIcon}></image>
		<text x="150" y="265" font-size="18" fill="white">LN Dan:</text>
		<image width="25" height="25" x="215" y="246" href={data.danIcon}></image>

		<text x="375" y="195" font-size="18" fill="white">7K Achievements: </text>
		<text x="400" y="225" font-size="18" fill="white">Dan Phase: </text>
		<image width="25" height="25" x="507" y="206" href={data.danIcon}></image>
		<text x="400" y="265" font-size="18" fill="white">Dan Phase: </text>
		<image width="25" height="25" x="507" y="246" href={data.danIcon}></image>
	</g>
	<g>
		<!--random misc info that might change idk-->
		<text x="125" y="300" font-size="18" fill="white">Joined on: </text>
		<text x="210" y="300" font-size="18" fill="white">{data.joinDate}</text>
	</g>
	<g>
		<!--footer-->
		<rect width="600" height="40" x="0" y="325" fill={data.profile_color} rx="10" ry="10"></rect>
		<text x="425" y="350" fill="white">@Made by Baconway</text>
	</g>
</svg>
