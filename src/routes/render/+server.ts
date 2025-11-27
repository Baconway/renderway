import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify('/discord.svg'), {
		status: 200,
		statusText: 'idk what to put here',
		headers: new Headers({
			'content-type': 'image/svg+xml'
		})
	});
};
