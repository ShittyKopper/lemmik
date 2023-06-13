import type { Session } from "svelte-kit-cookie-session";

export interface ThemePref {
	primary: string;
	neutral: string;
	dark?: boolean;
}

interface SessionData {
	// let's not put the lemmy jwt here. if we keep it in, say, localStorage
	// we'll force ourselves to only render authorized pages browserside, meaning
	// the server doesn't have to care about the privacy implications of having
	// access to the user's token.

	// logged out pages can still be rendered serverside for JS-less browsing

	prefs: {
		language?: string;
		theme?: ThemePref;
		avatarsEnabled?: boolean;
	};
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session<SessionData>;

			current: {
				language: string;
				theme: ThemePref;
			};
		}
		interface PageData {
			session: SessionData;
		}
		// interface Platform {}
	}
}

export {};
