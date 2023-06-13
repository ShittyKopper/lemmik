export interface ThemePref {
	primary: string;
	neutral: string;
	dark?: boolean;
}

export interface Prefs {
	language?: string;
	theme?: ThemePref;
	avatarsEnabled?: boolean;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prefs: Prefs;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
