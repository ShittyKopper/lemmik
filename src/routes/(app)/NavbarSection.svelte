<script lang="ts">
	export let className = "";
	export let links: { [href: string]: string };
</script>

<ul class={`flex h-full ${className}`}>
	{#each Object.entries(links) as [href, text]}
		<li class="flex h-full items-center px-2">
			<a
				class="flex h-full items-center whitespace-nowrap px-2 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none hover:dark:bg-neutral-700 focus:dark:bg-neutral-700"
				{href}
			>
				{text}
			</a>
		</li>
	{/each}
</ul>
