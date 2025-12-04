import type { PageServerLoad } from '../$types';
import * as osu from 'osu-api-v2-js';

import { getAPI, hslToHex, getCountryFlag } from '$lib';
import QuickChart from 'quickchart-js';
import { IMG_API_KEY, IMG_USER_ID, IMGBB_KEY } from '$env/static/private';

interface datasetIF {
	label: string;
	data: number[];
	fill: boolean;
	borderColor: string | null;
	pointBackgroundColor: string | null;
	pointBorderColor: string | null;
}

const api = getAPI();

const keyToRuleset: Record<string, osu.Ruleset> = {
	osu: osu.Ruleset.osu,
	taiko: osu.Ruleset.taiko,
	fruits: osu.Ruleset.fruits,
	mania: osu.Ruleset.mania
};

const playmodeToGamemodeName: Record<string, string> = {
	osu: 'osu!',
	taiko: 'osu!taiko',
	catch: 'osu!catch',
	mania: 'osu!mania'
};

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function createPlaycountChart(
	profile_hue: number,
	userPlaycount: Array<{ start_date: Date; count: number }>
) {
	let dataset: datasetIF = {
		label: 'Playcount',
		data: [],
		fill: false,
		borderColor: hslToHex(profile_hue as number, 100, 70),
		pointBackgroundColor: 'rgba(0, 0, 0, 0)',
		pointBorderColor: 'rgba(0, 0, 0, 0)'
	};
	let labelsSet: string[] = [];

	for (let index = 0; index < userPlaycount.length; index++) {
		const pc = userPlaycount[index];
		labelsSet.push(`${months[pc.start_date.getUTCMonth()]} ${pc.start_date.getFullYear()}`);
		dataset.data.push(pc.count);
	}

	const chart = new QuickChart();
	chart.setFormat('svg');
	chart.setBackgroundColor('transparent');
	chart.setWidth(500);
	chart.setHeight(185);
	chart.setDevicePixelRatio(3);
	chart.setConfig({
		type: 'line',
		data: {
			labels: labelsSet,
			datasets: [dataset]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [
					{
						gridlLines: { display: false, lineWidth: 0 },
						ticks: {
							fontSize: 10,
							fontColor: '#ffffff'
						}
					}
				],
				xAxes: [
					{
						gridLines: { display: false, lineWidth: 0 },
						ticks: {
							fontSize: 10,
							fontColor: '#ffffff'
						}
					}
				]
			}
		}
	});

	return chart;
}

function createRankChart(profile_hue: number, rankHistoryData: Array<number>) {
	let dataset: datasetIF = {
		label: 'Playcount',
		data: rankHistoryData,
		fill: false,
		borderColor: hslToHex(profile_hue as number, 100, 70),
		pointBackgroundColor: 'rgba(0, 0, 0, 0)',
		pointBorderColor: 'rgba(0, 0, 0, 0)'
	};

	const chart = new QuickChart();
	chart.setFormat('svg');
	chart.setBackgroundColor('transparent');
	chart.setWidth(500);
	chart.setHeight(185);
	chart.setDevicePixelRatio(3);
	chart.setConfig({
		type: 'line',
		data: {
			labels: rankHistoryData,
			datasets: [dataset]
		},
		options: {
			legend: {
				display: false
			},

			scales: {
				yAxes: [
					{
						gridlLines: { display: false, lineWidth: 0 },
						ticks: {
							fontSize: 10,
							fontColor: '#ffffff',
							reverse: true
						}
					}
				],
				xAxes: [
					{
						gridLines: { display: false, lineWidth: 0 },
						ticks: {
							display: false,
							fontSize: 10,
							fontColor: '#ffffff',
							stepSize: 50
						}
					}
				]
			}
		}
	});

	return chart;
}

export const load: PageServerLoad = async ({ fetch, url }) => {
	const graphType = url.searchParams.get('graphType');
	const rulesetGET = keyToRuleset[url.searchParams.get('mode') as string];
	const userGET = await api.getUser(url.searchParams.get('user') as string, rulesetGET);

	const BestPlays = await api.getUserScores(userGET.id, 'best', rulesetGET);
	const flagImage = await getCountryFlag(userGET.country_code);
	const teamInfo = await api.getUsers([userGET.id]);
	const userPlaycount = userGET.monthly_playcounts;

	let labelsSet: string[] = [];

	let dataset: datasetIF = {
		label: 'Playcount',
		data: [],
		fill: false,
		borderColor: hslToHex(userGET.profile_hue as number, 100, 70),
		pointBackgroundColor: 'rgba(0, 0, 0, 0)',
		pointBorderColor: 'rgba(0, 0, 0, 0)'
	};

	for (let index = 0; index < userPlaycount.length; index++) {
		const pc = userPlaycount[index];
		labelsSet.push(`${months[pc.start_date.getUTCMonth()]} ${pc.start_date.getFullYear()}`);
		dataset.data.push(pc.count);
	}

	let chart = createPlaycountChart(userGET.profile_hue as number, userPlaycount);

	switch (graphType) {
		case 'playcount':
			chart = createPlaycountChart(userGET.profile_hue as number, userPlaycount);
			break;
		case 'rankHistory':
			chart = createRankChart(
				userGET.profile_hue as number,
				userGET.rank_history?.data as Array<number>
			);
			break;
	}

	const profile_color = hslToHex(userGET.profile_hue as number, 100, 35);
	const card_color = hslToHex(userGET.profile_hue as number, 100, 15);

	const re = await fetch('https://hcti.io/v1/image', {
		method: 'POST',
		body: JSON.stringify({
			html: `<div style="height: 400px; width: 600px;"><svg
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
		<rect width="600" height="400" rx="10" ry="10" fill=${card_color}></rect>

		<image
			x="0"
			y="0"
			width="600"
			xlink:href=${userGET.cover.custom_url}
		></image>
	</g>
	<g>
		<!--profile bg, avatar-->
		<g>
			<rect width="600" height="110" y="55" fill=${profile_color}></rect>
			<image
				x="10"
				y="60"
				width="100"
				height="100"
				xlink:href=${userGET.avatar_url}
				clip-path="inset(0% round 6px)"
			></image>
		</g>
		<!--username, country, rank, peak rank-->
		<g>
			<text fill="white" x="135" y="90" font-size="25">${userGET.username}</text>
			<image
				width="30"
				height="20"
				x="255"
				y="75"
				xlink:href=${flagImage.flag}
				clip-path="inset(0% round 3px)"
			></image>
			<image
				width="40"
				height="20"
				x="290"
				y="75"
				xlink:href=${teamInfo[0].team?.flag_url}
				clip-path="inset(0% round 3px)"
			></image>
			<text x="135" y="125" fill="white">Global Rank</text>
			<text x="135" y="150" fill="white" font-size="23">#${userGET.statistics.global_rank}</text>
			<text x="250" y="125" fill="white">Peak Rank</text>
			<text x="250" y="150" fill="white" font-size="23">#${userGET.rank_highest?.rank}</text>
		</g>
		<!--gamemode, social media, total pp-->
		<g>
			<text x="375" y="89.5" font-size="15" fill="white">Mode:</text>
			<text x="420" y="89.5" font-size="15" fill="white">${playmodeToGamemodeName[url.searchParams.get('mode') as string]}</text>
			<text x="375" y="120" font-size="15" fill="white">Discord:</text>
			<text x="435" y="120" font-size="15" fill="white">${userGET.discord}</text>
			<text x="375" y="150" fill="white" font-size="18">${Math.round(userGET.statistics.pp as number)} pp</text>
		</g>
		<!--top play, level, playtime-->
		<g>
			<text x="25" y="200" font-size="18" fill="white">Level: ${userGET.statistics.level.current}</text>
			<text x="25" y="230" font-size="18" fill="white">Playtime: </text>
			<text x="25" y="255" font-size="18" fill="white">${Math.round((userGET.statistics.play_time as number) / 3600)} hours</text>
			<text x="25" y="285" font-size="18" fill="white">Top Play:</text>
			<text x="25" y="310" font-size="18" fill="white">${Math.round(BestPlays[0].pp as number)} pp</text>
		</g>
	</g>
	<image x="100" y="150" width="500" height="225" xlink:href=${chart.getUrl()}></image>
	<g>
		<!--footer-->
		<rect width="600" height="40" x="0" y="360" fill=${profile_color}></rect>
		<text x="425" y="385" fill="white">@Made by Baconway</text>
	</g>
</svg></div>
`
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + btoa(IMG_USER_ID + ':' + IMG_API_KEY)
		}
	});
	const result = await re.json(); //gets the shot of the website from here

	const dataBody = new FormData();
	dataBody.append('image', result.url);

	const uploadResp = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
		method: 'POST',
		body: dataBody,
		headers: {}
	});
	return {
		cover: userGET.cover,
		avatar_url: userGET.avatar_url,

		flag: flagImage.flag,
		teamFlag: teamInfo[0].team?.flag_url,
		country: userGET.country.name,

		username: userGET.username,
		currentRank: userGET.statistics.global_rank,
		peakRank: userGET.rank_highest?.rank,

		mode: userGET.playmode,
		modeRendering: url.searchParams.get('mode'),
		modeName: playmodeToGamemodeName[url.searchParams.get('mode') as string],

		discord: userGET.discord,
		joinDate: `${userGET.join_date.getDate()} - ${months[userGET.join_date.getMonth()]} - ${userGET.join_date.getFullYear()}`,

		level: userGET.statistics.level.current,
		playtime: Math.round((userGET.statistics.play_time as number) / 3600),

		pp: Math.round(userGET.statistics.pp as number),
		bestPlay: Math.round(BestPlays[0].pp as number),

		profile_color: hslToHex(userGET.profile_hue as number, 100, 35),
		card_color: hslToHex(userGET.profile_hue as number, 100, 15),

		playcountChart: chart.getUrl(),
		cardLink: (await uploadResp.json()).data.url //uploaded to imgbb
	};
};
