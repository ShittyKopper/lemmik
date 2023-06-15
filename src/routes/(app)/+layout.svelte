<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { UI_BUILD_MODE } from "$env/static/public";
	import Navbar from "$lib/components/app/Navbar.svelte";
	import Settings from "$lib/components/app/Settings.svelte";
	import type { AccountContext } from "$lib/stores/accounts";
	import { getContext, onMount } from "svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	const { currentAccount } = getContext<AccountContext>("accounts");

	let settingsOpen = false;

	onMount(async () => {
		if (UI_BUILD_MODE == "spa") {
			if ($currentAccount == null) {
				await goto(`/login?return=${encodeURIComponent($page.url.pathname)}`);
			}
		}
	});
</script>

{#if !(UI_BUILD_MODE == "spa" && $currentAccount == null)}
	<Navbar site={data?.site.site_view.site} on:settings={() => (settingsOpen = true)} />

	<div
		id="content"
		class="mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-2 px-4 py-2 --full-width:max-w-none"
		tabindex="-1"
	>
		<slot />
	</div>
{/if}

{#if settingsOpen}
	<Settings on:close={() => (settingsOpen = false)} />
{/if}
