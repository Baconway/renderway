import * as osu from 'osu-api-v2-js'; //just to get enum access
import type { Actions } from './$types';
import { getUser } from '$lib';

export const actions = {
	submit: async ({ request }) => {
		const data: FormData = await request.formData();
		console.log(data);
		const username = data.get('name') as string;
		const ruleset = data.get('ruleset') as string;

		return await getUser(username, ruleset);
	}
} satisfies Actions;
