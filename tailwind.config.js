/* eslint-disable */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

// https://tailwindcss.com/docs/customizing-colors#default-color-palette
const THEMES = {
	primary: ["rose", "emerald", "sky", "purple"],
	neutral: ["slate", "zinc", "stone"],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: [
		...THEMES.primary.map((theme) => `--primary-${theme}`),
		...THEMES.neutral.map((theme) => `--neutral-${theme}`),
	],

	darkMode: ["class", "#app.--dark"],

	theme: {
		colors: {
			transparent: colors.transparent,
			white: colors.white,
			black: colors.black,

			warning: colors.amber,
			error: colors.red,
			success: colors.lime,
		},
	},

	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("--full-width", "#app.--full-width &");
		}),

		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("tailwindcss-themer")({
			themes: [
				...THEMES.primary.map((theme) => makeVariant("primary", theme)),
				...THEMES.neutral.map((theme) => makeVariant("neutral", theme)),
			],
		}),
	],
};

function makeVariant(variant, name) {
	return {
		name: `${variant}-${name}`,
		selectors: [`#app.--${variant}-${name}`],
		extend: {
			colors: {
				[variant]: colors[name],
			},
		},
	};
}
