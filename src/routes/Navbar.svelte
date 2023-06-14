<script lang="ts">
	import { UI_BUILD_MODE } from "$env/static/public";
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import NavbarSection from "./NavbarSection.svelte";

	let searchQuery: string;
</script>

<header class="lm-box border-l-0 border-r-0 border-t-0 p-0">
	<a
		href="#content"
		class="fixed m-1 border border-primary-500 bg-primary-200 px-4 py-2 text-xl opacity-0 focus-within:opacity-100 dark:text-black"
	>
		<Localized id="navbar-skip" />
	</a>

	<nav
		class="mx-auto grid h-16 w-full max-w-screen-2xl grid-cols-12 items-center gap-2 px-4 text-lg --full-width:max-w-none"
	>
		<NavbarSection className="text-xl col-span-3" links={{ "/": "Instance Name" }} />
		<form class="col-span-6">
			<input
				type="search"
				name="q"
				bind:value={searchQuery}
				placeholder="@!community@example.com"
				class="w-full border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-300"
			/>
		</form>
		<NavbarSection
			className="justify-end col-span-3"
			links={{ "/login": $localize("navbar-login"), "/settings": $localize("navbar-settings") }}
		/>
	</nav>
</header>

{#if UI_BUILD_MODE == "node"}
	<noscript class="lm-box --warning border-l-0 border-r-0 border-t-0">
		<section class="mx-auto max-w-screen-2xl px-5 --full-width:max-w-none">
			<Localized id="navbar-noscript" />
		</section>
	</noscript>
{/if}
