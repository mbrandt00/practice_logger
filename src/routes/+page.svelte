<script lang="ts">
	export let data;
	import type { Entry } from '$lib/types/togglEntry.js';
	const timeEntries: Entry[] = data.timeEntries;
</script>

<h3>Recent Entries</h3>
{#each timeEntries as entry}
	{entry.at}
	{entry.project_id}
	{entry.project?.name}
{/each}
