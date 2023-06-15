<script lang="ts">
	import type { Prefs } from "$lib/stores/prefs";
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import type { Community } from "lemmy-js-client";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	export let community: Community;

	const prefs = getContext<Writable<Prefs>>("prefs");

	// this seems fragile, but lemmy-ui also does it so idc
	$: actor_url = new URL(community.actor_id);
	$: href = community.local
		? `/community/${community.name}`
		: `/community/${community.name}@${actor_url.hostname}`;

	$: displayName = community.title || community.name;
</script>

{#if community.deleted}
	<i><Localized id="community-deleted" /></i>
{:else}
	<a
		{href}
		class={`flex flex-row items-center gap-1 whitespace-nowrap text-primary-700 dark:text-primary-400`}
	>
		{#if $prefs.avatarsEnabled && community.icon}
			<img src={community.icon} alt={$localize("community-icon", { community: displayName })} />
		{/if}

		{displayName}
	</a>
{/if}
