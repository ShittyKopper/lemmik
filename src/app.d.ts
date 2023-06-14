import type { Prefs } from "$lib/stores/prefs";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			prefs?: Prefs;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
