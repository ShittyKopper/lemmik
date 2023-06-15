<script lang="ts">
	import { Localized } from "@nubolab-ffwd/svelte-fluent";
	import type { GetSiteResponse } from "lemmy-js-client";

	export let getSiteResponse: GetSiteResponse;
</script>

<main class="lm-box p-0" class:col-span-9={$$slots.sidebar} class:col-span-12={!$$slots.sidebar}>
	<slot />
</main>

{#if $$slots.sidebar}
	<aside class="col-span-3 flex flex-col gap-1">
		<section class="lm-box">
			<slot name="sidebar" />
		</section>

		<section class="text-center text-sm text-neutral-500 dark:text-neutral-400">
			<Localized
				id="sidebar-bottom"
				args={{
					version: import.meta.env.LEMMIK_VERSION,
					lemmyVersion: getSiteResponse?.version,
				}}
			/>
		</section>
	</aside>
{/if}
