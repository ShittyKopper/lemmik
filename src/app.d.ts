import type { Session } from "svelte-kit-cookie-session";

export interface ThemePref {
	primary: string;
	neutral: string;
	dark?: boolean;
}

interface SessionData {
	accounts: {
		lemmyJwt?: string;
	}[];

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
