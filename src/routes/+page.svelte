<script lang="ts">
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

{#snippet checkbox(gamemode: string, modeName: string, defaultChosen: boolean | null)}
	<div class="flex flex-row items-center justify-center">
		{#if defaultChosen}
			<input type="radio" name="ruleset" checked value={gamemode} />
		{:else}
			<input type="radio" name="ruleset" value={gamemode} />
		{/if}

		<label for="gamemode name">{modeName}</label>
	</div>
{/snippet}

<div class="flex flex-col items-center justify-center gap-5 text-white">
	<h1>osu! profile render thingamabob</h1>
	<form class="flex flex-col" method="POST" autocomplete="off" action="?/submit">
		<label for="username showcase">
			{#if form?.success}
				Username Inputted:
				{form?.username}
			{:else}
				Enter A Valid Username:
			{/if}
		</label>
		<input
			id="nameInput"
			class="border-2 border-white bg-transparent text-white outline-transparent focus:outline-none"
			type="text"
			name="name"
		/>
		<div class="flex flex-row gap-5">
			{@render checkbox('osu', 'osu!', true)}
			{@render checkbox('mania', 'osu!mania', false)}
			{@render checkbox('taiko', 'osu!taiko', false)}
			{@render checkbox('fruits', 'osu!catch', false)}
		</div>
		<button type="submit">test button</button>
	</form>

	<div
		class="flex flex-col gap-5
	md:flex-row
	"
	>
		<button><img alt="template" /></button>
		<button><img alt="template" /></button>
		<button><img alt="template" /></button>
	</div>

	{#if form?.success}
		<a
			class=""
			href={`/render/?user=${encodeURIComponent(form?.username as string)}&mode=${encodeURIComponent(form?.mode as string)}`}
			target="_blank">Generate</a
		>
	{/if}
</div>
