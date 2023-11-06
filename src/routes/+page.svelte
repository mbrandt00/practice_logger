<script lang="ts">
	import type { Entry } from '$lib/types/togglObjects.js';
	import { formatDateString, formatSecondsToHoursAndMinutes } from '$lib/utils/stringFormatter.js';
	export let data;
	const timeEntries: Entry[] = data.timeEntries;
	async function handleCheckboxChange(event: any) {
		const isChecked = event.target.checked;
		if (isChecked) {
			const response = await fetch('/createEntry', {
				method: 'POST',
				body: JSON.stringify({
					workspace_id: parseInt(data.userData.default_workspace_id),
					billable: false,
					created_with: 'practice_logger',
					duration: -1,
					project_id: parseInt(event.target.dataset.project),
					start: new Date(),
					task_id: parseInt(event.target.dataset.task)
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Server-side code executed successfully');
			} else {
				console.error('Server-side code execution failed');
			}
		}
	}
</script>

<h3>Recent Entries</h3>
<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th />
				<th>Date</th>
				<th>Piece</th>
				<th>Composer</th>
				<th>Time Practiced</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each timeEntries as entry}
				<tr>
					<th>
						<label>
							<input
								type="checkbox"
								class="checkbox"
								on:change={handleCheckboxChange}
								data-entry={entry.id}
								data-project={entry.project_id}
								data-task={entry.task_id}
							/>
						</label>
					</th>
					<td>
						<div class="flex items-center">
							<div>
								<div class="font-bold">{formatDateString(entry.at)}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								<div class="font-bold">{entry.project?.name}</div>
								<div class="text-sm opacity-50">{entry?.task?.name ?? ''}</div>
							</div>
						</div>
					</td>
					<td>
						{entry?.client?.name ?? ''}
					</td>
					<td> {formatSecondsToHoursAndMinutes(entry.duration)}</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
