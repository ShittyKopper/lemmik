import type { LayoutServerLoad } from "./$types";
import { loadData } from "./layout.common";

export const load = (({ fetch }) => {
	return loadData(fetch);
}) satisfies LayoutServerLoad;
