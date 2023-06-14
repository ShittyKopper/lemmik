<script lang="ts">
	import "../app.css";

	import { browser } from "$app/environment";
	import { env } from "$env/dynamic/public";
	import { bundleOf, negotiate } from "$lib/languages/main";
	import { loadAccounts, type Account, type AccountContext } from "$lib/stores/accounts";
	import { loadPrefsBrowser, type Prefs } from "$lib/stores/prefs";
	import { boolEnv } from "$lib/util";
	import { FluentProvider } from "@nubolab-ffwd/svelte-fluent";
	import { onMount, setContext } from "svelte";
	import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import Navbar from "./Navbar.svelte";

	export let data: LayoutData | null;

	const prefs = setContext("prefs", writable<Prefs>(data?.prefs));
	const accounts = setContext<AccountContext>("accounts", {
		accounts: writable<Record<string, Account>>(),
		currentAccount: writable<string | null>(),
	});

	const autoDarkMode = boolEnv(env.UI_DEFAULT_THEME_DARK_AUTO);
	const fullWidth = false;

	const darkModeDefault = writable(
		autoDarkMode
			? browser
				? window.matchMedia("(prefers-color-scheme: dark)").matches
				: false
			: false,
	);

	onMount(() => {
		if (autoDarkMode) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (m) => darkModeDefault.set(m.matches));
		}

		if (!$prefs) {
			loadPrefsBrowser(prefs);
		}

		loadAccounts(accounts.accounts, accounts.currentAccount);
	});

	$: darkModeChoice = $prefs?.theme?.dark != undefined ? $prefs?.theme.dark : null;
	$: darkMode = darkModeChoice == null ? $darkModeDefault : darkModeChoice;

	$: language =
		$prefs?.language ||
		(browser ? negotiate(navigator.languages) : data?.current?.language || env.UI_DEFAULT_LANGUAGE);

	$: primaryTheme = $prefs?.theme?.primary || env.UI_DEFAULT_THEME_PRIMARY;
	$: neutralTheme = $prefs?.theme?.neutral || env.UI_DEFAULT_THEME_NEUTRAL;
</script>

<div
	id="app"
	class={`--primary-${primaryTheme} --neutral-${neutralTheme}`}
	class:--dark={darkMode}
	class:--full-width={fullWidth}
>
	<!-- this is a separate div as the theme selectors require a parent. -->

	<div
		class="h-full min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 dark:[color-scheme:only_dark]"
	>
		<FluentProvider bundles={[bundleOf(language)]}>
			<Navbar />

			<div
				id="content"
				class="mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-2 px-4 py-2 --full-width:max-w-none"
				tabindex="-1"
			>
				<slot />
			</div>
		</FluentProvider>
	</div>
</div>
