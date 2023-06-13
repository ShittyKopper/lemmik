/* eslint-disable */

import svelteFluent from "@nubolab-ffwd/svelte-fluent/rollup-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [svelteFluent(), sveltekit()],
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
});
