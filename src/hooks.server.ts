import { negotiate } from "$lib/languages/main";
import AcceptLanguageParser from "accept-language-parser";
import { env as privateEnv } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import { handleSession } from "svelte-kit-cookie-session";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import type { ThemePref } from "./app";

const session = handleSession({
	secret: privateEnv.SECRET,
	chunked: true,
	expires: Number.MAX_SAFE_INTEGER,
	cookie: {
		sameSite: "strict",
		httpOnly: true,
	},
});

const language = (({ event, resolve }) => {
	const session = event.locals.session.data;

	let language: string;
	if (session.prefs && session.prefs.language) {
		language = session.prefs.language;
	} else {
		const acceptedLanguages = AcceptLanguageParser.parse(
			event.request.headers.get("accept-language") || undefined,
		).map((alp) => alp.code);

		language = negotiate(acceptedLanguages);
	}

	event.locals.current = { ...event.locals.current, language };

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace("%app.lang%", language),
	});
}) satisfies Handle;

const theme = (({ event, resolve }) => {
	const session = event.locals.session.data;

	let theme: ThemePref;
	if (session.prefs && session.prefs.theme) {
		theme = session.prefs.theme;
	} else {
		theme = {
			primary: publicEnv.UI_DEFAULT_THEME_PRIMARY || "sky",
			neutral: publicEnv.UI_DEFAULT_THEME_NEUTRAL || "slate",
			dark: publicEnv.UI_DEFAULT_THEME_DARK == "1",
		};
	}

	event.locals.current = { ...event.locals.current, theme };

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

export const handle = sequence(session, language, theme);
