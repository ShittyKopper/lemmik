import { env as publicEnv } from "$env/dynamic/public";
import type { RequestEvent } from "@sveltejs/kit";
import AcceptLanguageParser from "accept-language-parser";
import type { Prefs, ThemePref } from "../app";
import { negotiate } from "./languages/main";

export const PREFS_COOKIE = "lemmik_prefs";

export const DEFAULT_PREFS = {
	avatarsEnabled: true,
	language: undefined,
	theme: undefined,
};

export function loadPrefs(event: RequestEvent) {
	const prefsCookie = event.cookies.get(PREFS_COOKIE);

	let prefs: Prefs;
	if (prefsCookie) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		prefs = JSON.parse(prefsCookie);
	} else {
		prefs = DEFAULT_PREFS;
		event.cookies.set(PREFS_COOKIE, JSON.stringify(prefs));
	}

	event.locals.prefs = prefs;
}

export function loadLanguage(event: RequestEvent) {
	const prefs = event.locals.prefs;

	let language: string;
	if (prefs && prefs.language) {
		language = prefs.language;
	} else {
		const acceptedLanguages = AcceptLanguageParser.parse(
			event.request.headers.get("accept-language") || undefined,
		).map((alp) => alp.code);

		language = negotiate(acceptedLanguages);
	}

	event.locals.prefs = { ...event.locals.prefs, language };
	return language;
}

export function loadTheme(event: RequestEvent): ThemePref {
	const prefs = event.locals.prefs;

	let theme: ThemePref;
	if (prefs && prefs.theme) {
		theme = prefs.theme;
	} else {
		theme = {
			primary: publicEnv.UI_DEFAULT_THEME_PRIMARY || "sky",
			neutral: publicEnv.UI_DEFAULT_THEME_NEUTRAL || "slate",
			dark: undefined,
		};
	}

	event.locals.prefs = { ...event.locals.prefs, theme };
	return theme;
}
