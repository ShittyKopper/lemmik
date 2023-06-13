import nodeAdapter from "@sveltejs/adapter-node";
import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

let adapter;

if (process.env.VITE_BUILD_MODE == "node")
	adapter = nodeAdapter({
		envPrefix: "SRV_",
		polyfill: !!process.env.VITE_NODE_POLYFILL,
	});
else if (process.env.VITE_BUILD_MODE == "spa")
	adapter = staticAdapter({ fallback: process.env.VITE_SPA_FALLBACK || "index.html" });
else
	console.warn("lemmik: Missing or invalid env variable VITE_BUILD_MODE. must be 'node' or 'spa'");

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter,

		paths: {
			base:
				process.env.VITE_BUILD_MODE == "spa" && process.argv.includes("dev")
					? ""
					: process.env.BUILD_BASE_PATH,
		},

		prerender:
			process.env.VITE_BUILD_MODE == "spa"
				? {
						entries: [],
				  }
				: {},

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
