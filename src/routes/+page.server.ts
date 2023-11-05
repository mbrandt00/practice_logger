import { getTimeEntriesWithProjects } from '$lib/server/toggl-client';

export async function load() {

	return {
		timeEntries: getTimeEntriesWithProjects()
	};
}
