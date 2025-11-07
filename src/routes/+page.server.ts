import type { Actions } from './$types';
import { testcall } from '$lib';
import { stringify } from 'querystring';

export const actions = {
	submit: async ({ request }) => {
		const data: FormData = await request.formData();
		console.log(data);
		const username = data.get('name') as string;
		console.log(await testcall(username));
	}
};
