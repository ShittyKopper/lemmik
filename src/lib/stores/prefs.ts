import { browser } from "$app/environment";
import { get, type Writable } from "svelte/store";

export const DEFAULT_PREFS = {
	language: undefined,
	theme: undefined,

	avatarsEnabled: true,
	fullWidth: false,
	icons: true,
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
	fullWidth?: boolean;
	icons?: boolean;
}

export function loadPrefs(store: Writable<Prefs | null>) {
	if (!browser) throw new Error("Attempted to load prefs serverside.");
	if (get(store) != null) throw new Error("Attempted to load prefs twice.");

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
