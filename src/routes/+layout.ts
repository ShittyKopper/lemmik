import type { LayoutLoad } from "./$types";
import { loadData } from "./layout.common";

export const ssr = true;
export const prerender = true;
export const trailingSlash = "always";

export const load = (({ data, fetch }) => {
	if (data != null) return data;
	return loadData(fetch);
}) satisfies LayoutLoad;
