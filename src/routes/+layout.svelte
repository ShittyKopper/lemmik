<script lang="ts">
	import "../app.css";

	import { browser } from "$app/environment";
	import { bundleOf } from "$lib/languages/main";
	import { FluentProvider } from "@nubolab-ffwd/svelte-fluent";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	const darkModeDefault = writable(
		browser ? window.matchMedia("(prefers-color-scheme: dark)").matches : false,
	);

	$: darkModeChoice =
		data.session.prefs?.theme?.dark != undefined ? data.session.prefs.theme.dark : null;

	$: darkMode = darkModeChoice == null ? $darkModeDefault : darkModeChoice;
	$: if (browser) document.body.classList.toggle("--dark", darkMode);

	onMount(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (m) => darkModeDefault.set(m.matches));
	});
</script>

<FluentProvider bundles={[bundleOf(data.current.language)]}>
	<slot />
</FluentProvider>

<style lang="postcss">
	:global(body) {
		@apply h-full;

		@apply bg-neutral-50 text-neutral-900;
		@apply dark:bg-neutral-800 dark:text-neutral-50;
	}
</style>
