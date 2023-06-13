<script lang="ts">
	import PostRiver from "$lib/components/PostRiver.svelte";
</script>

<div
	class="mx-auto grid max-w-screen-2xl grid-cols-12 gap-2 px-4 py-2 [.--full-width_&]:max-w-none"
>
	<main
		class="col-span-9 border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950"
	>
		<PostRiver />
	</main>

	<aside
		class="col-span-3 border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950"
	>
		.
	</aside>
</div>
