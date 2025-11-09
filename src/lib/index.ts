// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import { OSU_CLIENT_SECRET } from '$env/static/private';

const api = await osu.API.createAsync(45354, OSU_CLIENT_SECRET);
api.refresh_token_on_expires = true;

const KeyToRuleset: Record<number, osu.Ruleset> = {
	0: osu.Ruleset.osu,
	1: osu.Ruleset.taiko,
	2: osu.Ruleset.fruits,
	3: osu.Ruleset.mania
};

export async function testcall(username: string, gamemode: number) {
	try {
		const user = await api.getUser(username, KeyToRuleset[gamemode]);
		return { success: true, country: user.country, username: user.username, mode: user.playmode };
	} catch (error) {
		return { success: false };
	}
}
