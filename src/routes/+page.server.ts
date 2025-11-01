import type { Actions } from './$types';
import { testcall } from '$lib';

export const actions = {
	default: (async) => {
		testcall(11);
	}
};
