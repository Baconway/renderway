// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import { OSU_CLIENT_SECRET } from '$env/static/private';

const api = await osu.API.createAsync(45354, OSU_CLIENT_SECRET);
api.refresh_token_on_expires = true;

const keyToRuleset: Record<string, osu.Ruleset> = {
	osu: osu.Ruleset.osu,
	taiko: osu.Ruleset.taiko,
	fruits: osu.Ruleset.fruits,
	mania: osu.Ruleset.mania
};

export async function getUser(username: string, gamemode: string) {
	//checks if name returns actual player
	const rulesetChosen = keyToRuleset[gamemode];
	try {
		const user = await api.getUser(username, rulesetChosen);
		return {
			success: true,
			username: user.username, //username, mode is for the form, userdata is for card
			mode: gamemode,
			fullData: user
		};
	} catch (error) {
		return { success: false };
	}
}

export function hslToHex(h: number, s: number, l: number) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
