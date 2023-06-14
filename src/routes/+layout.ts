import { env } from "$env/dynamic/public";
import { Lemmy } from "$lib/lemmy";
import type { LayoutLoad } from "./$types";

export const ssr = true;
export const prerender = true;
export const trailingSlash = "always";

export const load = (({ data, fetch }) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const lemmy = new Lemmy(env.UI_DEFAULT_INSTANCE!, { fetch });

	return {
		...data,

		site: lemmy.getSite(),
	};
}) satisfies LayoutLoad;
