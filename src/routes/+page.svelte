<script lang="ts">
	import type { FocusEventHandler } from 'svelte/elements';
	import type { PageProps } from './$types';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';

	let { form }: PageProps = $props();
	let options = $state({ previousName: '', helpOpen: false });

	const focus_out: FocusEventHandler<HTMLInputElement> = (event) => {
		const target = event.target as HTMLInputElement;
		window.localStorage.setItem('inputBox', target.value);
	};

	if (browser) {
		options.previousName = window.localStorage.getItem('inputBox') as string;
	}
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
				{options.previousName}
			{:else}
				Enter A Valid Username:
			{/if}
		</label>
		<input
			class="border-2 border-white bg-transparent text-white outline-transparent focus:outline-none"
			type="text"
			name="name"
			onfocusout={focus_out}
			value={options.previousName}
		/>

		<div class="flex flex-row gap-5">
			{@render checkbox('osu', 'osu!', true)}
			{@render checkbox('mania', 'osu!mania', false)}
			{@render checkbox('taiko', 'osu!taiko', false)}
			{@render checkbox('fruits', 'osu!catch', false)}
		</div>

		<button type="submit">Generate</button>
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
		<a class="" href={form?.redirectURL} target="_blank">Generate</a>
	{/if}
</div>
<div class="flex flex-col items-center justify-center gap-2">
	<button
		class="border-2 border-amber-50 bg-amber-600 p-2 text-white"
		type="button"
		onclick={() => {
			options.helpOpen = !options.helpOpen;
			console.log(options.helpOpen);
		}}>Help</button
	>
	{#if options.helpOpen}
		<div class="text-white" transition:fade>
			<p>How to Render as an Image:</p>
			<ol class=" list-decimal">
				<li>
					Go to <a
						class="text-blue-600"
						href="https://jakearchibald.github.io/svgomg/"
						target="_blank"
						title="svg renderer">https://jakearchibald.github.io/svgomg/</a
					>
				</li>
				<li>Paste into "Paste Markup"</li>
				<li>Press the Download Button</li>
				<li>
					Upload to <a
						class="text-blue-600"
						target="_blank"
						href="https://imgbb.com"
						title="image hoster">IMGBB</a
					>
				</li>
			</ol>
		</div>
	{/if}
</div>
