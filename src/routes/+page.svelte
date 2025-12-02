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
		console.log(window.localStorage.getItem('imgLink'));
	}

	function themeChange() {
		if (document.documentElement.className == 'dark') {
			document.documentElement.className = 'light';
		} else {
			document.documentElement.className = 'dark';
		}
	}

	function delImageLink() {
		if (window.localStorage.getItem('imgLink')) {
			const delCall = async () => {
				await fetch('/render', {
					method: 'POST',
					body: JSON.stringify(window.localStorage.getItem('imgLink')),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			};

			delCall();
			window.localStorage.removeItem('imgLink');
			alert('Image link has been successfully deleted!');
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

<div class="dark: flex flex-col items-center justify-center gap-5 dark:text-white">
	<img class="mt-5 h-64 w-64 dark:invert" src="/os.png" alt="logo" />
	<form
		class="flex flex-col gap-2 border-2 p-2 dark:border-white"
		method="POST"
		autocomplete="off"
		action="?/submit"
	>
		<label for="username showcase">
			{#if form?.foundPlayer == true}
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

		{#if !form?.foundPlayer}
			<button class="w-full border-2 dark:border-white" type="submit">Check</button>{/if}
	</form>
	<div class=" flex flex-row gap-2">
		<img
			class="h-40 w-60 object-contain duration-200 hover:h-60 hover:w-90"
			src="/template/playcount.png"
			alt="template 1"
		/>
		<img
			class="h-40 w-60 object-contain duration-200 hover:h-60 hover:w-90"
			src="/template/playcount.png"
			alt="template 2"
		/>
	</div>
	{#if form?.foundPlayer}
		<a class="border-2 pr-5 pl-5 dark:border-white" href={form?.redirectURL} target="_blank"
			>Generate</a
		>
	{/if}
</div>

<button
	class="absolute top-5 right-5 rounded-2xl border-4 dark:border-white"
	type="button"
	onclick={() => themeChange()}
	><img class="h-16 w-16 dark:invert" src="/themeSwitch.svg" alt="switch theme" /></button
>

<button
	class="absolute top-25 right-5 border-3 border-black bg-red-600 p-2 text-white dark:border-white"
	type="button"
	onclick={() => delImageLink()}
>
	Delete Previous Image
</button>

<div class="mt-2 flex flex-col items-center justify-center gap-2">
	<button
		class="dark:border-dark border-4 border-dashed bg-[#fef200] p-2 text-3xl font-bold text-black"
		type="button"
		onclick={() => {
			options.helpOpen = !options.helpOpen;
		}}>Warning</button
	>
	{#if options.helpOpen}
		<div class="flex flex-col items-center justify-center text-lg dark:text-white" transition:fade>
			<p>Click on the image to get the image link!</p>
			<p>
				Do remember the image doesnt refresh whenever your stats change, so please make a new card
				when that happens
			</p>
			<p>It's recommended you delete the Previous image link (dont flood my api cap pls)</p>
			<p class="text-3xl">Thanks for using this website!</p>
		</div>
	{/if}
</div>
