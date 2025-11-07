// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import { ComSpec, OSU_CLIENT_SECRET } from '$env/static/private';

const api = await osu.API.createAsync(45354, OSU_CLIENT_SECRET);
api.refresh_token_on_expires = true;

export async function testcall(username: string) {
	const user = await api.getUser(username, osu.Ruleset.mania);
	return user.country;
}
