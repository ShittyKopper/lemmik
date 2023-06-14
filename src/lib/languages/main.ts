import { env } from "$env/dynamic/public";
import type { Prefs } from "$lib/stores/prefs";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import AcceptLanguageParser from "accept-language-parser";

// Register new languages here
// vvvvvvvvvvvvvvvvvvvvvvvvvvv
import en from "./en.ftl?raw";

const LANGUAGES: Record<string, FluentResource> = {
	en: new FluentResource(en),
};
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^

import common from "./_common.ftl?raw";
const COMMON_RESOURCE = new FluentResource(common);
const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

export function bundleOf(language: string) {
	const resource = LANGUAGES[language];
	const bundle = new FluentBundle(language);
	bundle.addResource(COMMON_RESOURCE);
	bundle.addResource(resource);
	return bundle;
}

export function negotiate(languages: readonly string[]) {
	const negotiated = negotiateLanguages(languages, SUPPORTED_LANGUAGES, {
		defaultLocale: env.UI_DEFAULT_LANGUAGE,
		strategy: "lookup",
	});

	return negotiated[0];
}

export function loadFromRequest(prefs: Prefs, request: Request) {
	let language: string;
	if (prefs && prefs.language) {
		language = prefs.language;
	} else {
		const acceptedLanguages = AcceptLanguageParser.parse(
			request.headers.get("accept-language") || undefined,
		).map((alp) => alp.code);

		language = negotiate(acceptedLanguages);
	}

	return language;
}
