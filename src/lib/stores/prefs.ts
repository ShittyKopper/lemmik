import { browser } from "$app/environment";
import type { Cookies } from "@sveltejs/kit";
import { get, type Writable } from "svelte/store";

export const DEFAULT_PREFS = {
	avatarsEnabled: true,
	language: undefined,
	theme: undefined,
};

export const PREFS_STORAGE_KEY = "lemmik_prefs";

export interface ThemePref {
	primary: string;
	neutral: string;
	dark?: boolean;
}

export interface Prefs {
	language?: string;
	theme?: ThemePref;
	avatarsEnabled?: boolean;
}

export function loadPrefsBrowser(store: Writable<Prefs | null>) {
	if (!browser) throw new Error("Attempted to load in-browser prefs serverside.");
	if (get(store) != null) throw new Error("Attempted to load in-browser preferences twice!");

	let loading = true;
	store.subscribe((prefs) => {
		if (loading) return;
		localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
	});

	const prefsJson = localStorage.getItem(PREFS_STORAGE_KEY);
	if (prefsJson) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const prefs: Prefs = JSON.parse(prefsJson);
		store.set(prefs);
	}

	loading = false;
}

export function loadPrefsCookie(cookies: Cookies): Prefs {
	const prefsCookie = cookies.get(PREFS_STORAGE_KEY);

	if (prefsCookie) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(prefsCookie);
	} else {
		return DEFAULT_PREFS;
	}
}
