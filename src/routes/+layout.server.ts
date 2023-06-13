import { VITE_BUILD_MODE } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const ssr = VITE_BUILD_MODE != "spa";
export const trailingSlash = VITE_BUILD_MODE == "spa" ? "always" : "ignore";

export const load = (({ locals }) => {
	return {
		session: locals.session.data,
		current: locals.current,
	};
}) satisfies LayoutServerLoad;
