import type { RequestHandler } from '@sveltejs/kit';
import { IMG_USER_ID, IMG_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const imgLink: string = await request.json();
	const rep = await fetch(`https://hcti.io/v1/image/${imgLink.slice(25)}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + btoa(IMG_USER_ID + ':' + IMG_API_KEY)
		}
	});
	await rep;

	return new Response(JSON.stringify('success'));
};
