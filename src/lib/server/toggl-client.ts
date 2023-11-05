import { TOGGL_API_TOKEN } from '$env/static/private';
import type { Entry, Project } from '$lib/types/togglObjects';
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

export async function getTimeEntriesWithProjects() {
	const timeEntries: Entry[] = await togglRequest('/me/time_entries');
	for (let i = 0; i < timeEntries.length; i++) {
		const entryWithProject: Project = await addProjectInfoToEntry(timeEntries[i])
		timeEntries[i].project = entryWithProject;
	}
	return timeEntries
}


export async function addProjectInfoToEntry(entry: Entry) {
	const projectInfo: Project = await togglRequest(`/workspaces/${entry.workspace_id}/projects/${entry.project_id}`);
	return projectInfo
}