import { error } from '@sveltejs/kit';

export const GET = async ({ request }) => {
	const url = request.headers.get('X-Proxy-Url');
	if (!url) throw error(400, 'No url specified');
	try {
		return fetch(url);
	} catch {
		throw error(500, 'Failed to fetch url');
	}
};
