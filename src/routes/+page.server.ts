import * as osu from 'osu-api-v2-js'; //just to get enum access
import type { Actions } from './$types';
import { validationCheck } from '$lib';

export const actions = {
	submit: async ({ request }) => {
		const data: FormData = await request.formData();
		const username = data.get('name') as string;
		const ruleset = Number(data.get('ruleset')) as number;

		return await validationCheck(username, ruleset);
	}
} satisfies Actions;
