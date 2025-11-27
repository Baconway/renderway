import type { PageServerLoad } from '../$types';
import * as osu from 'osu-api-v2-js';

import { getAPI, hslToHex, getCountryFlag } from '$lib';
import QuickChart from 'quickchart-js';
import { json } from '@sveltejs/kit';

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

export const load: PageServerLoad = async ({ fetch, url }) => {
	const danGET = url.searchParams.get('dan');
	const rulesetGET = keyToRuleset[url.searchParams.get('mode') as string];
	const userGET = await api.getUser(url.searchParams.get('user') as string, rulesetGET);

	const BestPlays = await api.getUserScores(userGET.id, 'best', rulesetGET);
	const flagImage = await getCountryFlag(userGET.country_code);
	const teamInfo = await api.getUsers([userGET.id]);
	const userPlaycount = userGET.monthly_playcounts;

	let labelsSet: string[] = [];

	interface datasetIF {
		label: string;
		data: number[];
		fill: boolean;
		borderColor: string | null;
		pointBackgroundColor: string | null;
		pointBorderColor: string | null;
	}

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

		profile_color: hslToHex(userGET.profile_hue as number, 100, 50),
		card_color: hslToHex(userGET.profile_hue as number, 100, 15),
		username_color: hslToHex(userGET.profile_hue as number, 100, 70),

		playcountChart: chart.getUrl()
	};
};
