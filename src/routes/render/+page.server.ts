import type { PageServerLoad } from '../$types';
import * as osu from 'osu-api-v2-js';

import { getUser, hslToHex, getCountryFlag } from '$lib';

export const load: PageServerLoad = async ({ url }) => {
	const flagImage = await getCountryFlag('vn');

	const userData = await getUser(
		url.searchParams.get('user') as string,
		url.searchParams.get('mode') as string
	);

	return {
		cover: userData.fullData?.cover,
		avatar_url: userData.fullData?.avatar_url,

		flag: flagImage.flag,
		teamFlag: userData.team?.flag_url,
		country: userData.fullData?.country.name,

		username: userData.fullData?.username,
		currentRank: userData.fullData?.statistics.global_rank,
		peakRank: userData.fullData?.rank_highest?.rank,

		mode: userData.fullData?.playmode,
		modeRendering: userData.mode,
		modeName: userData.modeName,

		discord: userData.fullData?.discord,

		level: userData.fullData?.statistics.level.current,
		playtime: Math.round((userData.fullData?.statistics.play_time as number) / 3600),

		pp: Math.round(userData.fullData?.statistics.pp as number),
		bestPlay: userData.userTopPlay?.weight?.pp,

		profile_color: hslToHex(userData.fullData?.profile_hue as number, 100, 50),
		card_color: hslToHex(userData.fullData?.profile_hue as number, 100, 15),
		username_color: hslToHex(userData.fullData?.profile_hue as number, 100, 70)
	};
};
