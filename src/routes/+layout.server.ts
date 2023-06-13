import type { LayoutServerLoad } from "./$types";

export const load = (({ locals }) => {
	return {
		prefs: locals.prefs,
	};
}) satisfies LayoutServerLoad;
