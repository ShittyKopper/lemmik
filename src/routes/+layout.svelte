<script lang="ts">
	import "../app.css";

	import { browser } from "$app/environment";
	import { bundleOf, negotiate } from "$lib/languages/main";
	import { FluentProvider } from "@nubolab-ffwd/svelte-fluent";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import Navbar from "./Navbar.svelte";
	import { env } from "$env/dynamic/public";
	import { boolEnv } from "$lib/util";

	export let data: LayoutData;

	const autoDarkMode = boolEnv(env.UI_DEFAULT_THEME_DARK_AUTO);
	const fullWidth = false;

	const darkModeDefault = writable(
		autoDarkMode
			? browser
				? window.matchMedia("(prefers-color-scheme: dark)").matches
				: false
			: false,
	);

	$: darkModeChoice = data.prefs?.theme?.dark != undefined ? data.prefs.theme.dark : null;
	$: darkMode = darkModeChoice == null ? $darkModeDefault : darkModeChoice;
	$: if (browser) document.body.classList.toggle("--dark", darkMode);

	$: language =
		data.prefs.language || browser ? negotiate(navigator.languages) : env.UI_DEFAULT_LANGUAGE;

	onMount(() => {
		if (!autoDarkMode) return;

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (m) => darkModeDefault.set(m.matches));
	});
</script>

<FluentProvider bundles={[bundleOf(language)]}>
	<Navbar />

	<div id="content" class:--full-width={fullWidth} tabindex="-1">
		<slot />
	</div>
</FluentProvider>
