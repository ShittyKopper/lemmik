<script lang="ts">
	import { DEFAULT_PREFS, type Prefs } from "$lib/stores/prefs";
	import { Localized } from "@nubolab-ffwd/svelte-fluent";
	import { createEventDispatcher, getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const prefs = getContext<Writable<Prefs>>("prefs");
	const dispatch = createEventDispatcher();
</script>

<dialog open class="absolute left-0 top-0 grid h-screen w-screen bg-black bg-opacity-30">
	<main class="lm-box m-auto flex w-[32rem] flex-col gap-6">
		<section>
			<h3 class="mb-2 text-lg">Colors</h3>
			<fieldset class="grid grid-cols-4 gap-1">
				{#each ["rose", "emerald", "sky", "purple"] as theme}
					<input
						type="radio"
						bind:group={$prefs.theme.primary}
						value={theme}
						aria-label={theme}
						class={`h-8 w-full rounded-none !bg-${theme}-500 border-${theme}-700 checked:bg-${theme}-700`}
					/>
				{/each}
			</fieldset>
		</section>

		<section>
			<fieldset class="grid grid-cols-3 gap-1">
				{#each ["slate", "zinc", "stone"] as theme}
					<input
						type="radio"
						bind:group={$prefs.theme.neutral}
						value={theme}
						aria-label={theme}
						class={`h-8 w-full rounded-none !bg-${theme}-500 border-${theme}-700 checked:bg-${theme}-700`}
					/>
				{/each}
			</fieldset>
		</section>

		<section class="flex flex-col gap-1">
			<label for="dark">
				<input type="checkbox" name="dark" bind:checked={$prefs.theme.dark} />
				<Localized id="settings-dark" />
			</label>

			<label for="avatarsEnabled">
				<input type="checkbox" name="avatarsEnabled" bind:checked={$prefs.avatarsEnabled} />
				<Localized id="settings-avatars-enabled" />
			</label>

			<label for="icons">
				<input type="checkbox" name="icons" bind:checked={$prefs.icons} />
				<Localized id="settings-icons" />
			</label>

			<label for="fullWidth">
				<input type="checkbox" name="fullWidth" bind:checked={$prefs.fullWidth} />
				<Localized id="settings-full-width" />
			</label>
		</section>

		<section class="grid grid-cols-3 gap-2">
			<button
				class="col-span-2 bg-neutral-500 p-2 text-neutral-50"
				on:click={() => dispatch("close")}
			>
				<Localized id="settings-close" />
			</button>

			<button
				class="col-span-1 bg-error-500 p-2 text-neutral-50"
				on:click={() => ($prefs = DEFAULT_PREFS)}
			>
				<Localized id="settings-reset" />
			</button>
		</section>
	</main>
</dialog>
