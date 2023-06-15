<script lang="ts">
	import { UI_BUILD_MODE } from "$env/static/public";
	import type { Prefs } from "$lib/stores/prefs";
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import { Cog6Tooth } from "@steeze-ui/heroicons";
	import { Icon } from "@steeze-ui/svelte-icon";
	import type { Site } from "lemmy-js-client";
	import { createEventDispatcher, getContext } from "svelte";
	import type { Writable } from "svelte/store";

	export let site: Site;

	const dispatch = createEventDispatcher();
	const prefs = getContext<Writable<Prefs>>("prefs");

	let searchQuery: string;
</script>

<header class="lm-box border-l-0 border-r-0 border-t-0 p-0">
	<a
		href="#content"
		class="fixed m-1 -ml-4 -translate-x-full border border-primary-500 bg-primary-200 px-4 py-2 text-xl focus-within:ml-1 focus-within:translate-x-0 dark:text-black"
	>
		<Localized id="navbar-skip" />
	</a>

	<nav
		class="mx-auto grid h-16 w-full max-w-screen-2xl grid-cols-12 items-center gap-2 px-4 text-lg --full-width:max-w-none"
	>
		<a href="/" class="col-span-3 flex h-full flex-col justify-center">
			<h1 class="text-xl">{site.name}</h1>
			<span class="text-sm text-neutral-500 dark:text-neutral-400">{site.description}</span>
		</a>

		<form class="col-span-6">
			<input
				type="search"
				name="q"
				bind:value={searchQuery}
				placeholder="@!community@example.com"
				class="w-full border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-300"
			/>
		</form>

		<ul class="col-span-3 flex items-center justify-end gap-6">
			<li class="flex items-center">
				<a class="whitespace-nowrap" href="/login">
					<Localized id="navbar-login" />
				</a>
			</li>
			<li class="flex">
				<button title={$localize("navbar-settings")} on:click={() => dispatch("settings")}>
					{#if $prefs.icons}
						<Icon src={Cog6Tooth} size="24px" theme="outline" />
					{:else}
						<Localized id="navbar-settings" />
					{/if}
				</button>
			</li>
		</ul>
	</nav>
</header>

{#if UI_BUILD_MODE == "node"}
	<noscript class="lm-box --warning border-l-0 border-r-0 border-t-0">
		<section class="mx-auto max-w-screen-2xl px-5 --full-width:max-w-none">
			<Localized id="navbar-noscript" />
		</section>
	</noscript>
{/if}
