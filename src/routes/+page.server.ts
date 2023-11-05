import { addProjectInfoToEntry, togglRequest } from '$lib/server/toggl-client';
import type { Entry, Project } from '$lib/types/togglObjects';

export async function load() {
	const timeEntries: Entry[] = await togglRequest('/me/time_entries');
	for (let i = 0; i < timeEntries.length; i++) {
		const entryWithProject: Project = await addProjectInfoToEntry(timeEntries[i])

		timeEntries[i].project = entryWithProject;
	}
	return {
		timeEntries: timeEntries
	};
}
