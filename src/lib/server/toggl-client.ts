import { TOGGL_API_TOKEN } from '$env/static/private';
import type { Client, Entry, Project, Task, PostTimeEntryInput } from '$lib/types/togglObjects';
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

export async function postToggl(endpoint: string, body) {
	const url = `https://api.track.toggl.com/api/v9${endpoint}`;

	const headers = new Headers({
		Authorization: `Basic ${btoa(`${TOGGL_API_TOKEN}:api_token`)}`
	});
	console.log('headers', headers);

	const response = await fetch(url, {
		method: 'POST',
		headers: headers,
		body: body
	});
	console.log('response', response);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return await response.json();
}

export async function postEntry(body: PostTimeEntryInput) {
	console.log('final body', body);
	console.log('final url', `/workspaces/${body.workspace_id}/time_entries`);
	const response = await postToggl(
		`/workspaces/${body.workspace_id}/time_entries`,
		JSON.stringify(body)
	);
	return response;
}

export async function getTimeEntriesWithProjectsAndTaskInfo() {
	const timeEntries: Entry[] = await togglRequest('/me/time_entries');
	for (let i = 0; i < timeEntries.length - 3; i++) {
		const projectInfo: Project = await addProjectInfoToEntry(timeEntries[i]);
		const taskInfo: Task = await addTaskInfoToEntry(timeEntries[i]);
		const clientInfo: Client = await addClientInfoToProject(projectInfo);
		timeEntries[i].project = projectInfo;
		timeEntries[i].client = clientInfo;
		timeEntries[i].task = taskInfo;
	}
	return timeEntries;
}

export async function addProjectInfoToEntry(entry: Entry) {
	const projectInfo: Project = await togglRequest(
		`/workspaces/${entry.workspace_id}/projects/${entry.project_id}`
	);

	return projectInfo;
}
export async function addTaskInfoToEntry(entry: Entry) {
	if (entry.task_id) {
		return await togglRequest(
			`/workspaces/${entry.workspace_id}/projects/${entry.project_id}/tasks/${entry.task_id}`
		);
	}
	return;
}
export async function addClientInfoToProject(project: Project) {
	console.log(project.actual_seconds);
	if (project.client_id) {
		return await togglRequest(`/workspaces/${project.workspace_id}/clients/${project.client_id}`);
	}
	return;
}
