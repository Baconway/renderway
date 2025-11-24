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
		<select class="text-black" name="dan">
			<option value="1">1st Dan</option>
			<option value="2">2nd Dan</option>
			<option value="3">3rd Dan</option>
			<option value="4">4th Dan</option>
			<option value="5">5th Dan</option>
			<option value="6">6th Dan</option>
			<option value="7">7th Dan</option>
			<option value="8">8th Dan</option>
			<option value="9">9th Dan</option>
			<option value="10">10th Dan</option>
			<option value="Alpha">Alpha Dan</option>
			<option value="Beta">Beta Dan</option>
			<option value="Gamma">Gamma Dan</option>
			<option value="Delta">Delta Dan</option>
			<option value="Epsilon">Epsilon Dan</option>
		</select>
		<input name="danScreenshot" class="text-black" type="url" /><label for="screenshot link"
			>screenshot</label
		>
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
			href={`/render/?user=${encodeURIComponent(form?.username as string)}&mode=${encodeURIComponent(form?.mode as string)}&dan=${encodeURIComponent(form?.dan as string)}`}
			target="_blank">Generate</a
		>
	{/if}
</div>
