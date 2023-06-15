<script lang="ts">
	import type { AccountContext } from "$lib/stores/accounts";
	import type { Prefs } from "$lib/stores/prefs";
	import { Localized, localize } from "@nubolab-ffwd/svelte-fluent";
	import {
		Bookmark,
		ChevronDown,
		ChevronUp,
		ExclamationCircle,
		Fire,
		LockClosed,
		Megaphone,
		Square2Stack,
	} from "@steeze-ui/heroicons";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { formatRelative } from "date-fns";
	import type { PostView } from "lemmy-js-client";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import CommunityLink from "../CommunityLink.svelte";
	import PersonLink from "../PersonLink.svelte";

	export let enableDownvotes: boolean;
	export let post: PostView;

	const { currentAccount } = getContext<AccountContext>("accounts");
	const prefs = getContext<Writable<Prefs>>("prefs");

	$: featured = post.post.featured_community || post.post.featured_local;
	$: timestamp = formatRelative(new Date(post.post.published), new Date());
	$: loggedIn = $currentAccount != null;

	$: upvoted = (post.my_vote || 0) > 0;
	$: downvoted = (post.my_vote || 0) < 0;
</script>

<article
	class="lm-box flex h-24 flex-row gap-x-4 border-b border-l-0 border-r-0 border-t-0 last:border-0 even:bg-neutral-50 dark:even:bg-neutral-900"
>
	<div class="grid w-10 grid-rows-3 justify-items-center">
		<button
			class="disabled:opacity-50"
			class:text-primary-500={upvoted}
			title={$localize("postriver-item-upvote", { voted: upvoted ? "true" : "false" })}
			disabled={!loggedIn}
		>
			<Icon src={ChevronUp} size="24px" theme="solid" />
		</button>

		<span aria-label={$localize("postriver-item-score", { score: post.counts.score })}>
			{post.counts.score}
		</span>

		{#if enableDownvotes}
			<button
				class="disabled:opacity-50"
				class:text-primary-500={downvoted}
				title={$localize("postriver-item-downvote", { voted: downvoted ? "true" : "false" })}
				disabled={!loggedIn}
			>
				<Icon src={ChevronDown} size="24px" theme="solid" />
			</button>
		{/if}
	</div>

	{#if post.post.thumbnail_url}
		<a href={post.post.url} target="_blank" aria-hidden="true" tabindex="-1">
			<img class="h-20 w-32" src={post.post.thumbnail_url} alt="Thumbnail" />
		</a>
	{/if}

	<section class="flex flex-grow flex-col text-sm text-neutral-600 dark:text-neutral-400">
		<h1
			class="flex flex-row items-center gap-2 text-xl text-neutral-900 dark:text-neutral-200"
			class:opacity-70={post.read}
			class:text-primary-700={featured}
			class:dark:text-primary-300={featured}
		>
			{#if featured}
				<div title={$localize("postriver-item-featured")}>
					<Icon src={Megaphone} size="20px" theme="outline" />
				</div>
			{/if}

			{#if post.post.locked}
				<div class="text-warning-500" title={$localize("postriver-item-locked")}>
					<Icon src={LockClosed} size="20px" theme="outline" />
				</div>
			{/if}

			{#if post.post.nsfw}
				<div class="text-error-500" title={$localize("postriver-item-nsfw")}>
					<Icon src={Fire} size="20px" theme="outline" />
				</div>
			{/if}

			<a
				href={post.post.url || `/post/${post.post.id}`}
				target={post.post.url ? "_blank" : undefined}
			>
				{post.post.name}
			</a>
		</h1>

		<span class="flex flex-row gap-2">
			<PersonLink person={post.creator} distinguish={featured} />
			&middot;
			<CommunityLink community={post.community} />
			&middot;
			<span>{timestamp}</span>
		</span>

		<section class="flex-grow" />

		<nav>
			<ul class="flex flex-row gap-x-4">
				<li>
					<a href={`/post/${post.post.id}#comments`}>
						<Localized id="postriver-item-comments" args={{ count: post.counts.comments }} />

						{#if post.unread_comments > 0}
							<span class="text-primary-700">
								<Localized
									id="postriver-item-comments-unread"
									args={{ count: post.unread_comments }}
								/>
							</span>
						{/if}
					</a>
				</li>

				{#if !loggedIn}
					<li>
						<button
							title={$localize("postriver-item-save", { saved: post.saved ? "true" : "false" })}
						>
							{#if $prefs.icons}
								<div class:text-primary-500={post.saved}>
									<Icon src={Bookmark} size="20px" theme={post.saved ? "solid" : "outline"} />
								</div>
							{:else}
								<Localized
									id="postriver-item-save"
									args={{ saved: post.saved ? "true" : "false" }}
								/>
							{/if}
						</button>
					</li>
					<li>
						<button title={$localize("postriver-item-xpost")}>
							{#if $prefs.icons}
								<Icon src={Square2Stack} size="20px" theme={"outline"} />
							{:else}
								<Localized id="postriver-item-xpost" />
							{/if}
						</button>
					</li>
					<li>
						<button title={$localize("postriver-item-report")}>
							{#if $prefs.icons}
								<Icon src={ExclamationCircle} size="20px" theme={"outline"} />
							{:else}
								<Localized id="postriver-item-report" />
							{/if}
						</button>
					</li>
				{/if}
			</ul>
		</nav>
	</section>
</article>
