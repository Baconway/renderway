import * as osu from 'osu-api-v2-js'; //just to get enum access
import type { Actions } from './$types';
import { userCheck } from '$lib';

export const actions = {
	submit: async ({ request }) => {
		let redirect_url: string = '/render';

		const data: FormData = await request.formData();
		const username = data.get('name') as string;

		const Result = await userCheck(username);

		if (Result) {
			redirect_url = `/render/?user=${data.get('name')}&mode=${data.get('ruleset')}&dan=${data.get('dan')}`;
		}

		return { success: Result, redirectURL: redirect_url };
	}
} satisfies Actions;
