<script lang="ts">
	export let data;
	import '../app.css';
</script>

<h1>Currently logged in as {data.userData.fullname}</h1>
<slot />
