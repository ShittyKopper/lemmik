import { negotiateFromRequest } from "$lib/languages/main";
import type { LayoutServerLoad } from "./$types";

export const load = (({ request }) => {
	return {
		language: negotiateFromRequest(request),
	};
}) satisfies LayoutServerLoad;
