<script lang="ts">
	import type { LocalSite, PostView } from "lemmy-js-client";
	import Post from "./Post.svelte";

	export let localSite: LocalSite;
	export let posts: PostView[];
</script>

<div role="feed">
	{#each posts as post}
		<Post enableDownvotes={localSite.enable_downvotes} {post} />
	{/each}
</div>
