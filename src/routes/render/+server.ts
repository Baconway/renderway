import { type RequestHandler } from '@sveltejs/kit';
import { getAPI } from '$lib';

export const GET: RequestHandler = async ({ url, request }) => {
	console.log(request.url.search('user'));
	console.log(url.pathname, url.searchParams.get('user'));
	//console.log(await getAPI().getUser('Baconway'));
	return new Response(JSON.stringify([url.pathname, url.searchParams]), {
		status: 200,
		statusText: 'idk what to put here',
		headers: new Headers({
			'content-type': 'image/svg+xml'
		})
	});
};
