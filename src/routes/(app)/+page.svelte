<script lang="ts">
	import Markdown from "$lib/components/Markdown.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import Page from "$lib/components/app/Page.svelte";
	import PostRiver from "$lib/components/app/PostRiver.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Page getSiteResponse={data.site}>
	{#await data.streaming.posts}
		<Spinner />
	{:then posts}
		<PostRiver localSite={data.site.site_view.local_site} posts={posts.posts} />
	{/await}

	<article slot="sidebar" class="prose prose-sm max-w-none dark:prose-invert">
		{#if data.site.site_view.site.sidebar}
			<Markdown source={data.site.site_view.site.sidebar} />
		{/if}
	</article>
</Page>
