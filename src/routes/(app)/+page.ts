import { UI_BUILD_MODE } from "$env/static/public";
import type { PageLoad } from "./$types";
import { loadData } from "./page.common";

export const prerender = UI_BUILD_MODE == "spa";
export const ssr = UI_BUILD_MODE == "node";

export const load = (({ data, fetch, url }) => {
	if (data != null) return data;
	return loadData(fetch, url);
}) satisfies PageLoad;
