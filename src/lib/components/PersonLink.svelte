<script lang="ts">
	import type { Prefs } from "$lib/stores/prefs";
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import { Bolt, CpuChip, ShieldCheck } from "@steeze-ui/heroicons";
	import { Icon } from "@steeze-ui/svelte-icon";
	import type { Person } from "lemmy-js-client";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	export let person: Person;
	export let distinguish = false;

	const prefs = getContext<Writable<Prefs>>("prefs");

	// this seems fragile, but lemmy-ui also does it so idc
	$: actor_url = new URL(person.actor_id);
	$: href = person.local ? `/user/${person.name}` : `/user/${person.name}@${actor_url.hostname}`;

	$: displayName = person.display_name || person.name;
</script>

{#if person.deleted}
	<i><Localized id="person-deleted" /></i>
{:else}
	<a
		{href}
		class={`flex flex-row items-center gap-1 whitespace-nowrap text-primary-700 dark:text-primary-400`}
		class:line-through={person.banned}
	>
		{#if $prefs.avatarsEnabled && person.avatar}
			<img src={person.avatar} alt={$localize("person-avatar", { person: displayName })} />
		{/if}

		{displayName}

		{#if person.bot_account}
			<div title={$localize("person-bot")} class="text-neutral-700 dark:text-neutral-200">
				<Icon src={CpuChip} size="20px" theme="mini" class="-mb-1 opacity-50" />
			</div>
		{/if}

		{#if distinguish}
			{#if person.admin}
				<div
					title={$localize("person-admin")}
					class:text-success-700={distinguish}
					class:dark:text-success-300={distinguish}
				>
					<!-- this isn't the best icon for "admin" -->
					<Icon src={Bolt} size="20px" theme="mini" class="-mb-1 opacity-50" />
				</div>
			{:else}
				<div
					title={$localize("person-moderator")}
					class:text-success-700={distinguish}
					class:dark:text-success-300={distinguish}
				>
					<!-- this isn't the best icon for "moderator" either -->
					<Icon src={ShieldCheck} size="20px" theme="mini" class="-mb-1 opacity-50" />
				</div>
			{/if}
		{/if}
	</a>
{/if}
