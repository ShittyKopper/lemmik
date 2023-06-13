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
				"default-src": ["none"],
				"script-src": ["self"],
				"style-src": ["self"],

				// allow images and video from anywhere
				"img-src": ["self", "https:"],
				"media-src": ["self", "https:"],

				// allow fetch() to any lemmy instance
				"connect-src": ["self", "https:"],

				// maybe relaxable for embedding later on
				// "object-src": ["none"],
				// "frame-src": ["none"],
				// "child-src": ["none"],
			},
		},
	},
};

export default config;
