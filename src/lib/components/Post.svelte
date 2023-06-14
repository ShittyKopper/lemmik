<script lang="ts">
	import { Localized, Overlay, localize } from "@nubolab-ffwd/svelte-fluent";
	import { ChevronDown, ChevronUp } from "@steeze-ui/heroicons";
	import { Icon } from "@steeze-ui/svelte-icon";
</script>

<article
	class="lm-box flex h-24 flex-row gap-x-4 border-b border-l-0 border-r-0 border-t-0 last:border-0 even:bg-neutral-50 dark:even:bg-neutral-900"
>
	<div class="grid w-10 grid-rows-3 justify-items-center">
		<button title={$localize("postriver-item-upvote", { voted: "false" })}>
			<Icon src={ChevronUp} size="24px" theme="solid" />
		</button>
		<span aria-label={$localize("postriver-item-score", { score: 3 })}>3</span>
		<button title={$localize("postriver-item-downvote", { voted: "false" })}>
			<Icon src={ChevronDown} size="24px" theme="solid" />
		</button>
	</div>

	<a href="http://example.com" target="_blank" aria-hidden="true" tabindex="-1">
		<img class="h-20 w-32" src="https://placehold.co/128x80" />
	</a>

	<section class="flex flex-grow flex-col text-sm text-neutral-600 dark:text-neutral-400">
		<h1 class="text-xl text-neutral-900 dark:text-neutral-200">
			<a href="http://example.com" target="_blank">Lorem Ipsum</a>
		</h1>

		<span class="byline">
			<Overlay
				id="postriver-item-byline"
				args={{
					user: "@user@example.com",
					community: "@!community@example.com",
					time: "1 hour",
				}}
			>
				<span data-l10n-name="time"><!--localized--></span>
				<a
					data-l10n-name="user"
					href="/u/test"
					class="whitespace-nowrap text-primary-700 dark:text-primary-400"
					style="--avatar:url(https://placehold.co/96x96);"
				>
					<!--localized-->
				</a>
				<a
					data-l10n-name="community"
					href="/c/test"
					class="whitespace-nowrap text-primary-700 dark:text-primary-400"
					style="--avatar:url(https://placehold.co/96x96);"><!--localized--></a
				>
			</Overlay>
		</span>

		<section class="flex-grow" />

		<nav>
			<ul class="flex flex-row gap-x-4">
				<li>
					<a href="/post/1">
						<Localized id="postriver-item-comments" args={{ count: 1 }} />
					</a>
				</li>
				<li><button><Localized id="postriver-item-save" args={{ saved: "false" }} /></button></li>
				<li><button><Localized id="postriver-item-xpost" /></button></li>
				<li><button><Localized id="postriver-item-report" /></button></li>
			</ul>
		</nav>
	</section>
</article>

<style lang="postcss">
	/* fluent's DOM overlays make having many elements painful. so let's hack our way through */
	[style*="--avatar"] {
		@apply before:mx-1 before:-mb-[5px] before:inline-block before:h-5 before:w-5 before:rounded-full before:bg-cover;
		&::before {
			background-image: var(--avatar);
		}
	}
</style>
