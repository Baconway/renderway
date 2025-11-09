import * as osu from 'osu-api-v2-js'; //just to get enum access
import type { Actions } from './$types';
import { testcall } from '$lib';
import { stringify } from 'querystring';

export const actions = {
	submit: async ({ request }) => {
		const data: FormData = await request.formData();
		const username = data.get('name') as string;
		const ruleset = data.get('ruleset') as string;

		return await testcall(username, ruleset);
	}
} satisfies Actions;
