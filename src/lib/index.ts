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
			username: user.username,
			mode: gamemode,
			fullData: user
		};
	} catch (error) {
		return { success: false };
	}
}
