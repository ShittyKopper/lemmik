import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			envPrefix: "SRV_",
			polyfill: false,
		}),

		env: {
			publicPrefix: "UI_",
		},

		csp: {
			directives: {
				"script-src": ["self"],
			},
		},
	},
};

export default config;
