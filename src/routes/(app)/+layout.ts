import { UI_BUILD_MODE } from "$env/static/public";

export const prerender = UI_BUILD_MODE == "spa";
export const ssr = UI_BUILD_MODE == "node";
