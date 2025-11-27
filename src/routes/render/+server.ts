import { type RequestHandler } from '@sveltejs/kit';
import { getAPI } from '$lib';

export const GET: RequestHandler = async ({ url, request }) => {
	console.log(url.pathname, url.searchParams);
	//console.log(await getAPI().getUser('Baconway'));
	return new Response(JSON.stringify([url.pathname, url.searchParams.get('user')]), {
		status: 200,
		statusText: 'idk what to put here',
		headers: new Headers({
			'content-type': 'image/svg+xml'
		})
	});
};
