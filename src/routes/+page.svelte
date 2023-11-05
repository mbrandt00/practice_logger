<script lang="ts">
	import type { Entry } from '$lib/types/togglObjects.js';
	export let data;
	const timeEntries: Entry[] = data.timeEntries;
</script>

<h3>Recent Entries</h3>
{#each timeEntries as entry}
	{entry.at}
	{entry.project_id}
	{entry.project?.name}
{/each}
