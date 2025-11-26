<script lang="ts">
	import type { FocusEventHandler } from 'svelte/elements';
	import type { PageProps } from './$types';
	import type { Component } from 'svelte';
	import { browser } from '$app/environment';
	import Mania from './optional/mania.svelte';

	let { form }: PageProps = $props();
	let options = $state({ previousName: '', modeChosen: 'osu' });

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
			<input
				type="radio"
				name="ruleset"
				checked
				value={gamemode}
				onclick={() => (options.modeChosen = gamemode)}
			/>
		{:else}
			<input
				type="radio"
				name="ruleset"
				value={gamemode}
				onclick={() => (options.modeChosen = gamemode)}
			/>
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
		<Mania></Mania>
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
