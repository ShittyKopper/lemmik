import { building } from "$app/environment";
import { env as privateEnv } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import { mapUndef } from "$lib/util";
import type { HandleFetch } from "@sveltejs/kit";
import { LRUCache } from "lru-cache";

interface RequestCacheKey {
	url: string;
}

const cache = new LRUCache<RequestCacheKey, Response>({
	max: mapUndef(privateEnv.NS_LRU_CACHE_MAX, (t) => parseInt(t)) || 200,
	ttl: mapUndef(privateEnv.NS_LRU_CACHE_TTL, (t) => parseInt(t)),
	ttlAutopurge: true,
});

export const handleFetch = (async ({ request, fetch }) => {
	if (building) throw new Error("Build attempted fetch(). Stop trying to make fetch happen.");

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
	const tryCache = request.method == "get" && !request.url.includes("auth");
	const cacheKey: RequestCacheKey = {
		url: request.url,
	};

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
