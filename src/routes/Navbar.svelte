<script lang="ts">
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import NavbarSection from "./(app)/NavbarSection.svelte";

	let searchQuery: string;
</script>

<header class="border-b border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950">
	<a
		href="#content"
		class="fixed m-1 border border-primary-500 bg-primary-200 px-4 py-2 text-xl opacity-0 focus-within:opacity-100"
	>
		<Localized id="navbar-skip" />
	</a>

	<nav
		class="mx-auto grid h-16 w-full max-w-screen-2xl grid-cols-12 items-center gap-2 px-4 text-lg [:global(--full-width)_&]:max-w-none"
	>
		<NavbarSection className="text-xl col-span-3" links={{ "/": "Instance Name" }} />
		<div class="col-span-6 m-auto w-full max-w-screen-md">
			<input
				type="search"
				name="q"
				bind:value={searchQuery}
				placeholder="@!community@example.com"
				class="w-full border border-neutral-300 bg-neutral-100 px-3 py-2 hover:bg-neutral-200 focus:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 hover:dark:bg-neutral-700 focus:dark:bg-neutral-700"
			/>
		</div>
		<NavbarSection
			className="justify-end col-span-3"
			links={{ "/login": $localize("navbar-login"), "/settings": $localize("navbar-settings") }}
		/>
	</nav>
</header>
