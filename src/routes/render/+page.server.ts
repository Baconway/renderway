import type { PageServerLoad } from '../$types';
import * as osu from 'osu-api-v2-js';

import { getUser, hslToHex } from '$lib';

export const load: PageServerLoad = async ({ url }) => {
	const userData = await getUser(
		url.searchParams.get('user') as string,
		url.searchParams.get('mode') as string
	);
	return {
		cover: userData.fullData?.cover,
		avatar_url: userData.fullData?.avatar_url,

		username: userData.fullData?.username,
		profile_color: hslToHex(userData.fullData?.profile_hue as number, 100, 50)
	};
};
