// https://developers.track.toggl.com/docs/api/time_entries
export interface Entry {
  id: number
  workspace_id: number
  task_id: number | null
  project_id: number
  billable: boolean
  start: string
  stop: string | null // null if still running
  duration: number //seconds
  description: string | null
  tags: string[]
  tag_ids: number[]
  duronly: boolean
  at: string
  user_id: number
  pid: number
  server_deleted_at: string | null
}