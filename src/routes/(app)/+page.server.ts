import type { PageServerLoad } from "./$types";
import { loadData } from "./page.common";

export const load = (({ fetch, url }) => {
	return loadData(fetch, url);
}) satisfies PageServerLoad;
