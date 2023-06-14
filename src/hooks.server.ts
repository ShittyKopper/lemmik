import { building } from "$app/environment";
import { env as privateEnv } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import { mapUndef } from "$lib/util";
import type { HandleFetch } from "@sveltejs/kit";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, Response>({
	max: mapUndef(privateEnv.NS_LRU_CACHE_MAX, (t) => parseInt(t)) || 200,
	ttl: mapUndef(privateEnv.NS_LRU_CACHE_TTL, (t) => parseInt(t)),
	ttlAutopurge: true,
});

export const handleFetch = (async ({ request, fetch, event }) => {
	if (building) throw new Error("Build attempted fetch(). Stop trying to make fetch happen.");

	const clientAddr = event.getClientAddress();
	request.headers.set("Forwarded", clientAddr);
	request.headers.set("X-Forwarded-For", clientAddr);
	request.headers.set("X-Real-IP", clientAddr);

	if (request.url.startsWith(publicEnv.UI_DEFAULT_INSTANCE)) {
		if (privateEnv.NS_DEFAULT_INSTANCE_SERVERSIDE != undefined) {
			request = new Request(
				request.url.replace(
					publicEnv.UI_DEFAULT_INSTANCE,
					privateEnv.NS_DEFAULT_INSTANCE_SERVERSIDE,
				),
				request,
			);
		}
	}

	// it helps that lemmy stuffs literally everything into url parameters.
	const tryCache = request.method == "GET" && !request.url.includes("auth");
	const cacheKey = request.url;

	if (tryCache) {
		const cached = cache.get(cacheKey);
		if (cached != undefined) {
			console.debug("Serving request from cache.", cache.size, "responses in cache");
			return cached.clone();
		}
	}

	const response = await fetch(request);

	if (tryCache && response.ok) {
		cache.set(cacheKey, response.clone());
		console.debug("Cached response.", cache.size, "responses in cache");
	}

	return response;
}) satisfies HandleFetch;
