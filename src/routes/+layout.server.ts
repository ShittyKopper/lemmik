import { loadFromRequest } from "$lib/languages/main";
import { loadPrefsCookie } from "$lib/stores/prefs";
import type { LayoutServerLoad } from "./$types";

export const load = (({ cookies, request }) => {
	const prefs = loadPrefsCookie(cookies);

	return {
		prefs,

		current: {
			language: loadFromRequest(prefs, request),
		},
	};
}) satisfies LayoutServerLoad;
