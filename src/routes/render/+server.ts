import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ url }) => {
	console.log(url.pathname, url.searchParams);
	return new Response(JSON.stringify([url.pathname, url.searchParams]), {
		status: 200,
		statusText: 'idk what to put here',
		headers: new Headers({
			'content-type': 'image/svg+xml'
		})
	});
};
