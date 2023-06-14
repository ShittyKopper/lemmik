/* eslint-disable */

import svelteFluent from "@nubolab-ffwd/svelte-fluent/rollup-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [svelteFluent(), sveltekit()],

	css: {
		postcss: {
			plugins: [tailwindcssNesting(postcssNesting), tailwindcss, autoprefixer],
		},
	},

	build: {
		sourcemap: true,
	},
});
