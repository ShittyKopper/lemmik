<script lang="ts">
	import "../app.css";

	import { browser } from "$app/environment";
	import { env } from "$env/dynamic/public";
	import { bundleOf, negotiate } from "$lib/languages/main";
	import { loadAccounts, type Account, type AccountContext } from "$lib/stores/accounts";
	import { loadPrefs, type Prefs } from "$lib/stores/prefs";
	import { boolEnv } from "$lib/util";
	import { FluentProvider } from "@nubolab-ffwd/svelte-fluent";
	import { onMount, setContext } from "svelte";
	import { derived, writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import Navbar from "./Navbar.svelte";
	import { Lemmy } from "$lib/lemmy";

	export let data: LayoutData;

	const prefs = setContext("prefs", writable<Prefs | null>(null));
	const accounts = setContext<AccountContext>("accounts", {
		accounts: writable<Record<string, Account>>(),
		currentAccount: writable<string | null>(),
	});

	const lemmy = setContext(
		"lemmy",
		derived([accounts.accounts, accounts.currentAccount], ([$accounts, $current]) => {
			if ($current == null) return null;
			if (!($current in $accounts)) return null;

			const account = $accounts[$current];
			return new Lemmy(account.instance, { token: account.jwt });
		}),
	);

	const autoDarkMode = boolEnv(env.UI_DEFAULT_THEME_DARK_AUTO);

	const darkModeDefault = writable(
		autoDarkMode
			? browser
				? window.matchMedia("(prefers-color-scheme: dark)").matches
				: false
			: false,
	);

	onMount(() => {
		if (!$prefs) {
			loadPrefs(prefs);
		}

		if (autoDarkMode) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (m) => darkModeDefault.set(m.matches));
		}

		loadAccounts(accounts.accounts, accounts.currentAccount);
	});

	$: darkModeChoice = $prefs?.theme?.dark != undefined ? $prefs?.theme.dark : null;
	$: darkMode = darkModeChoice == null ? $darkModeDefault : darkModeChoice;

	$: language =
		$prefs?.language ||
		(browser ? negotiate(navigator.languages) : data?.language || env.UI_DEFAULT_LANGUAGE);

	$: primaryTheme = $prefs?.theme?.primary || env.UI_DEFAULT_THEME_PRIMARY;
	$: neutralTheme = $prefs?.theme?.neutral || env.UI_DEFAULT_THEME_NEUTRAL;
</script>

<div
	id="app"
	class={`--primary-${primaryTheme} --neutral-${neutralTheme}`}
	class:--dark={darkMode}
	class:--full-width={$prefs?.fullWidth}
>
	<!-- this is a separate div as the theme selectors require a parent. -->

	<div
		class="h-full min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 dark:[color-scheme:only_dark]"
	>
		<FluentProvider bundles={[bundleOf(language)]}>
			<Navbar site={data?.site.site_view.site} />

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
