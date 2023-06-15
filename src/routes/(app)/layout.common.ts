import { env } from "$env/dynamic/public";
import { Lemmy } from "$lib/lemmy/main";
import type { Fetch } from "../../app";

export function loadData(fetch: Fetch) {
	const lemmy = new Lemmy(env.UI_DEFAULT_INSTANCE, { fetch });

	return {
		site: lemmy.getSite(),
	};
}
