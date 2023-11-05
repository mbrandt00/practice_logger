<script lang="ts">
	import type { Entry } from '$lib/types/togglObjects.js';
	import { formatSecondsToHoursAndMinutes } from '$lib/utils/stringFormatter.js';
	export let data;
	const timeEntries: Entry[] = data.timeEntries;
</script>

<h3>Recent Entries</h3>
<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th />
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
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
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
					<td>{formatSecondsToHoursAndMinutes(entry?.project?.actual_seconds) ?? ''}</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
