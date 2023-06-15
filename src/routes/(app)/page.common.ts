import { env } from "$env/dynamic/public";
import { Lemmy } from "$lib/lemmy/main";
import { mapNull } from "$lib/util";
import type { ListingType, SortType } from "lemmy-js-client";
import type { Fetch } from "../../app";

export function loadData(fetch: Fetch, url: URL) {
	const lemmy = new Lemmy(env.UI_DEFAULT_INSTANCE, { fetch });
	const params = url.searchParams;

	return {
		streaming: {
			posts: lemmy.getPosts({
				page: mapNull(params.get("page"), (p) => parseInt(p)) || undefined,
				sort: (params.get("sort") as SortType) || undefined,
				type_: (params.get("type") as ListingType) || undefined,
			}),
		},
	};
}
