import type { Actions } from './$types';
import { testcall } from '$lib';

export const actions = {
	submit: async ({ request }) => {
		const data = await request.formData();
		console.log(data.get('name'));
	}
};
