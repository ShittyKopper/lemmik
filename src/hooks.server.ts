import { VITE_BUILD_MODE } from "$env/static/private";
import type { Handle, HandleFetch } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { loadLanguage, loadPrefs, loadTheme } from "$lib/loadCommonData";

const prefs = (({ event, resolve }) => {
	loadPrefs(event);
	return resolve(event);
}) satisfies Handle;

const language = (({ event, resolve }) => {
	const language = loadLanguage(event);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace("%app.lang%", language),
	});
}) satisfies Handle;

const theme = (({ event, resolve }) => {
	const theme = loadTheme(event);

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

export const handle = sequence(prefs, language, theme);
export const handleFetch = (async ({ request, fetch }) => {
	if (VITE_BUILD_MODE == "spa")
		throw new Error("SPA build attempted fetch(). Stop trying to make fetch happen.");

	return fetch(request);
}) satisfies HandleFetch;
