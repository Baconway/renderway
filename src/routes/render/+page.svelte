<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	if (browser) {
		if (!window.localStorage.getItem('imgLink')) {
			window.localStorage.setItem('imgLink', data.cardLink);
		}
	}
</script>

<a href={data.cardLink} target="_blank" title="click to get the image link!">
	<svg
		id="svg"
		width="600"
		height="400"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<style>
			text {
				font-family: 'Arimo', sans-serif;
			}
		</style>
		<!--card bg, cover-->
		<g>
			<rect width="600" height="400" rx="10" ry="10" fill={data.card_color}></rect>

			<image x="0" y="0" width="600" xlink:href={data.cover?.custom_url}></image>
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
					xlink:href={data.avatar_url}
					clip-path="inset(0% round 6px)"
				></image>
			</g>
			<!--username, country, rank, peak rank-->
			<g>
				<text fill="white" x="135" y="90" font-size="25">{data.username}</text>
				<image
					width="30"
					height="20"
					x="255"
					y="75"
					xlink:href={data.flag}
					clip-path="inset(0% round 3px)"
				></image>
				<image
					width="40"
					height="20"
					x="290"
					y="75"
					xlink:href={data.teamFlag}
					clip-path="inset(0% round 3px)"
				></image>
				<text x="135" y="125" fill="white">Global Rank</text>
				<text x="135" y="150" fill="white" font-size="23">#{data.currentRank}</text>
				<text x="250" y="125" fill="white">Peak Rank</text>
				<text x="250" y="150" fill="white" font-size="23">#{data.peakRank}</text>
			</g>
			<!--gamemode, social media, total pp-->
			<g>
				<text x="375" y="89.5" font-size="15" fill="white">Mode:</text>
				<text x="420" y="89.5" font-size="15" fill="white">{data.modeName}</text>
				<text x="375" y="120" font-size="15" fill="white">Discord:</text>
				<text x="432" y="120" font-size="15" fill="white">{data.discord}</text>
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
		<image x="100" y="150" width="500" height="225" xlink:href={data.playcountChart}></image>
		<g>
			<!--footer-->
			<rect width="600" height="40" x="0" y="360" fill={data.profile_color} rx="10" ry="10"></rect>
			<text x="425" y="385" fill="white">@Made by Baconway</text>
		</g>
	</svg>
</a>
