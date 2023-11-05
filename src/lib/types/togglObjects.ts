// https://developers.track.toggl.com/docs/api/time_entries
export interface Entry {
	id: number;
	workspace_id: number;
	task_id: number | null;
	project_id: number;
	billable: boolean;
	start: string;
	stop: string | null; // null if still running
	duration: number; //seconds
	description: string | null;
	tags: string[];
	tag_ids: number[];
	duronly: boolean;
	at: string;
	user_id: number;
	pid: number;
	server_deleted_at: string | null;
	project?: Project;
}

export interface Project {
	active: boolean;
	actual_hours: number | null;
	actual_seconds: number | null;
	at: string;
	billable: boolean | null;
	client_id: number | null;
	color: string;
	created_at: string;
	end_date: string;
	estimated_hours: number | null;
	estimated_seconds: number | null;
	first_time_entry: string; // only included if requested with_first_time_entry=true
	id: number;
	name: string;
	rate: number;
	rate_last_updated: string | null;
	server_deleted_at: string | null;
	start_date: string;
	template: boolean | null;
	workspace_id: number;
}
