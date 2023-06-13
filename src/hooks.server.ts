import { env as publicEnv } from "$env/dynamic/public";
import { VITE_BUILD_MODE } from "$env/static/private";
import { negotiate } from "$lib/languages/main";
import { boolEnv } from "$lib/util";
import type { Handle, HandleFetch } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import AcceptLanguageParser from "accept-language-parser";
import type { Prefs, ThemePref } from "./app";

const PREFS_COOKIE = "lemmik_prefs";

const language = (({ event, resolve }) => {
	const prefsCookie = event.cookies.get(PREFS_COOKIE);

	let prefs: Prefs;
	if (prefsCookie) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		prefs = JSON.parse(prefsCookie);
	} else {
		prefs = {
			avatarsEnabled: true,
			language: publicEnv.UI_DEFAULT_LANGUAGE,
			theme: {
				neutral: publicEnv.UI_DEFAULT_THEME_NEUTRAL,
				primary: publicEnv.UI_DEFAULT_THEME_PRIMARY,
				dark: boolEnv(publicEnv.UI_DEFAULT_THEME_DARK),
			},
		};

		event.cookies.set(PREFS_COOKIE, JSON.stringify(prefs));
	}

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

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace("%app.lang%", language),
	});
}) satisfies Handle;

const theme = (({ event, resolve }) => {
	const prefs = event.locals.prefs;

	let theme: ThemePref;
	if (prefs && prefs.theme) {
		theme = prefs.theme;
	} else {
		theme = {
			primary: publicEnv.UI_DEFAULT_THEME_PRIMARY || "sky",
			neutral: publicEnv.UI_DEFAULT_THEME_NEUTRAL || "slate",
			dark: publicEnv.UI_DEFAULT_THEME_DARK == "1",
		};
	}

	event.locals.prefs = { ...event.locals.prefs, theme };

	// tailwind.config.js safelist is broken, so here I go with a terrible workaround. ahem:
	// --primary-rose --primary-emerald --primary-purple --neutral-stone
	// (tailwind is too stupid to understand this is a comment)

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace("%app.theme.dark%", theme.dark ? "--dark" : "")
				.replace("%app.theme.primary%", theme.primary == "sky" ? "" : `--primary-${theme.primary}`)
				.replace(
					"%app.theme.neutral%",
					theme.neutral == "slate" ? "" : `--neutral-${theme.neutral}`,
				),
	});
}) satisfies Handle;

export const handle = sequence(language, theme);

export const handleFetch = (async ({ request, fetch }) => {
	if (VITE_BUILD_MODE == "spa")
		throw new Error("SPA build attempted fetch(). Stop trying to make fetch happen.");

	return fetch(request);
}) satisfies HandleFetch;
