import { togglRequest } from '$lib/server/toggl-client';

export async function load() {
	const timeEntries = await togglRequest('/me/time_entries');
	for (let i = 0; i < timeEntries.length; i++) {
		const workspaceId = timeEntries[i].workspace_id;
		const projectId = timeEntries[i].project_id;
		const projectData = await togglRequest(`/workspaces/${workspaceId}/projects/${projectId}`);
		timeEntries[i].project = projectData;
	}
	return {
		timeEntries: timeEntries
	};
}
