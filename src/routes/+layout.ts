import { browser } from "$app/environment";
import { UI_BUILD_MODE } from "$env/static/public";
import { DEFAULT_PREFS, PREFS_COOKIE } from "$lib/loadCommonData";
import type { Prefs } from "../app";
import type { LayoutLoad } from "./$types";

export const ssr = UI_BUILD_MODE == "node";
export const trailingSlash = "always";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const load = (({ data }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	if (data != null) return data;

	if (!browser) throw new Error("This isn't supposed to happen.");
	const prefsJson = localStorage.getItem(PREFS_COOKIE);

	let prefs: Prefs;
	if (prefsJson) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		prefs = JSON.parse(prefsJson);
	} else {
		prefs = DEFAULT_PREFS;
		localStorage.setItem(PREFS_COOKIE, JSON.stringify(prefs));
	}

	return {
		prefs,
	};
}) satisfies LayoutLoad;
