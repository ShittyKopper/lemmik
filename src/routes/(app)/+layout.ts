import { UI_BUILD_MODE } from "$env/static/public";
import type { LayoutLoad } from "./$types";
import { loadData } from "./layout.common";

export const prerender = UI_BUILD_MODE == "spa";
export const ssr = UI_BUILD_MODE == "node";

export const load = (({ data, fetch }) => {
	if (data != null) return data;
	return loadData(fetch);
}) satisfies LayoutLoad;
