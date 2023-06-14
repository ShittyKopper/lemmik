import { building } from "$app/environment";
import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch = (async ({ request, fetch }) => {
	if (building) throw new Error("Build attempted fetch(). Stop trying to make fetch happen.");

	return fetch(request);
}) satisfies HandleFetch;
