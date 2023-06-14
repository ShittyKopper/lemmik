import type { LayoutLoad } from "./$types";

export const ssr = true;
export const prerender = true;
export const trailingSlash = "always";

export const load = (({ data }) => {
	return data;
}) satisfies LayoutLoad;
