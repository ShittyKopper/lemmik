<script lang="ts">
	import "../app.css";

	import { browser } from "$app/environment";
	import { bundleOf } from "$lib/languages/main";
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

	$: darkModeChoice =
		data.session.prefs?.theme?.dark != undefined ? data.session.prefs.theme.dark : null;

	$: darkMode = darkModeChoice == null ? $darkModeDefault : darkModeChoice;
	$: if (browser) document.body.classList.toggle("--dark", darkMode);

	onMount(() => {
		if (!autoDarkMode) return;

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (m) => darkModeDefault.set(m.matches));
	});
</script>

<FluentProvider bundles={[bundleOf(data.current.language)]}>
	<Navbar />

	<div id="content" class:--full-width={fullWidth} tabindex="-1">
		<slot />
	</div>
</FluentProvider>
