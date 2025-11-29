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
	console.log(browser);
	function themeChange() {
		console.log(document.documentElement.className);
		if (document.documentElement.className == 'dark') {
			document.documentElement.className = 'light';
		} else {
			document.documentElement.className = 'dark';
		}
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

<div class="dark: flex flex-col items-center justify-center gap-10 dark:text-white">
	<img class="mt-5 h-64 w-64 dark:invert" src="/os.png" alt="logo" />
	<form
		class="flex flex-col gap-2 border-2 p-2 dark:border-white"
		method="POST"
		autocomplete="off"
		action="?/submit"
	>
		<label for="username showcase">
			{#if form?.success}
				Username Inputted:
				{options.previousName}
			{:else}
				Enter A Valid Username:
			{/if}
		</label>
		<input
			class="border-b-2 bg-transparent outline-transparent focus:outline-none dark:border-b-white"
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

		{#if !form?.success}
			<button class="w-full border-2 dark:border-white" type="submit">Check</button>{/if}
	</form>

	<!--<div
		class="flex flex-col gap-5
	md:flex-row
	"
	>
		<button><img alt="template" /></button>
		<button><img alt="template" /></button>
		<button><img alt="template" /></button>
	</div>-->

	{#if form?.success}
		<a class="border-2 pr-5 pl-5 dark:border-white" href={form?.redirectURL} target="_blank"
			>Generate</a
		>
	{/if}
</div>

<button class="absolute top-0 right-0" type="button" onclick={() => themeChange()}
	><img class="h-16 w-16 invert" src="/themeSwitch.svg" alt="switch theme" /></button
>
<div class="mt-2 flex flex-col items-center justify-center gap-2">
	<button
		class="border-2 border-amber-50 bg-amber-600 p-2 text-white"
		type="button"
		onclick={() => {
			options.helpOpen = !options.helpOpen;
		}}>Warning</button
	>
	{#if options.helpOpen}
		<div class="flex flex-col items-center justify-center text-white" transition:fade>
			<p>Click on the image to get the image link!</p>
			<p>
				Do remember the image doesnt refresh whenever your stats change, so please make a new card
				when that happens
			</p>
		</div>
	{/if}
</div>
