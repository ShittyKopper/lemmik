<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { UI_BUILD_MODE } from "$env/static/public";
	import type { AccountContext } from "$lib/stores/accounts";
	import { getContext, onMount } from "svelte";

	const { currentAccount } = getContext<AccountContext>("accounts");

	onMount(async () => {
		if (UI_BUILD_MODE == "spa") {
			if ($currentAccount == null) {
				await goto(`/login?return=${encodeURIComponent($page.url.pathname)}`);
			}
		}
	});
</script>

{#if !(UI_BUILD_MODE == "spa" && $currentAccount == null)}
	<slot />
{/if}
