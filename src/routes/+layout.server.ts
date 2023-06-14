import { negotiateFromRequest } from "$lib/languages/main";
import type { LayoutServerLoad } from "./$types";
import { loadData } from "./layout.common";

export const load = (({ request, fetch }) => {
	return {
		language: negotiateFromRequest(request),

		...loadData(fetch),
	};
}) satisfies LayoutServerLoad;
