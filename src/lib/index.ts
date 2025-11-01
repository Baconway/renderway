// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import { OSU_CLIENT_SECRET } from '$env/static/private';

const api = osu.API.createAsync(45354, OSU_CLIENT_SECRET);

export function testcall(params: any) {
	console.log('did i do this right?');
	console.log(api);
}
