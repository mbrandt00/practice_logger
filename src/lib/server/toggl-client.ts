import { TOGGL_API_TOKEN } from '$env/static/private';
export async function togglRequest(endpoint: string) {
	const url = `https://api.track.toggl.com/api/v9${endpoint}`;

	const headers = new Headers({
		Authorization: `Basic ${btoa(`${TOGGL_API_TOKEN}:api_token`)}`
	});

	const response = await fetch(url, {
		method: 'GET',
		headers: headers
	});

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return await response.json();
}
