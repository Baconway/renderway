<script lang="ts">
	import '../app.css';
	import favicon from '/salt.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>renderway</title>
</svelte:head>

<svelte:body />

{@render children?.()}
