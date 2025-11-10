import type { PageServerLoad } from '../$types';
import * as osu from 'osu-api-v2-js';
import { getUser } from '$lib';

export const load: PageServerLoad = async ({ url }) => {
	const userData = await getUser(
		url.searchParams.get('user') as string,
		url.searchParams.get('mode') as string
	);
	return userData.fullData;
};
