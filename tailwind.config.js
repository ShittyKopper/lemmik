/* eslint-disable */

const colors = require("tailwindcss/colors");

function makeVariant(variant, name) {
	return {
		name: `${variant}-${name}`,
		selectors: [`body.--${variant}-${name}`],
		extend: {
			colors: {
				[variant]: colors[name],
			},
		},
	};
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: ["class", ".--dark"],
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
		require("tailwindcss-themer")({
			defaultTheme: {
				extend: {
					colors: {
						// there needs to be some value for these, otherwise it
						// doesn't generate CSS vars. probably because we dynamically
						// generate the class names LUL
						// see src/hooks.server.ts for another terrible hack, free of charge

						// hardcoded sky and slate as defaults.
						primary: colors.sky,
						neutral: colors.slate,
					},
				},
			},
			themes: [
				makeVariant("primary", "rose"),
				makeVariant("primary", "emerald"),
				makeVariant("primary", "purple"),

				makeVariant("neutral", "stone"),
			],
		}),
	],
};
