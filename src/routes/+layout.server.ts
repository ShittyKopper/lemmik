import { VITE_BUILD_MODE } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const ssr = VITE_BUILD_MODE == "node";
export const trailingSlash = "always";

export const load = (({ locals }) => {
	return {
		prefs: locals.prefs,
	};
}) satisfies LayoutServerLoad;
