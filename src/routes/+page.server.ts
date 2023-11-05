import { getTimeEntriesWithProjectsAndTaskInfo } from '$lib/server/toggl-client';

export async function load() {
	return {
		timeEntries: getTimeEntriesWithProjectsAndTaskInfo()
	};
}
