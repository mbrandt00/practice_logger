import { postEntry } from '$lib/server/toggl-client.js';
import type { PostTimeEntryInput } from '$lib/types/togglObjects';
export async function POST({ request, response }) {
	const body: PostTimeEntryInput = await request.json();
	const serverResponse = await postEntry(body);
	console.log('final response', serverResponse);
	return new Response(JSON.stringify({ message: 'Success!' }), { status: 200 });
}
