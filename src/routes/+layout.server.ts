import type { LayoutServerLoad } from "./$types";

export const load = (({ locals }) => {
	return {
		session: locals.session.data,
		current: locals.current,
	};
}) satisfies LayoutServerLoad;
