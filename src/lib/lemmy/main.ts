import { browser } from "$app/environment";
import { LemmyHttp, type GetPosts } from "lemmy-js-client";

const USER_AGENT = "Lemmik frontend (serverside)";

interface Auth {
	auth?: string | undefined;
}

type Authless<T extends Auth> = Omit<T, "auth">;
type Authenticated<T extends Auth> = Authless<T> & Auth;

// A thin abstraction around the auth param & custom fetch
export class Lemmy {
	private http: LemmyHttp;
	private token?: string;

	constructor(
		instance: string,
		options: {
			token?: string;
			fetch?: typeof fetch;
		},
	) {
		this.http = new LemmyHttp(instance, browser ? {} : { "user-agent": USER_AGENT }, options.fetch);
		this.token = options?.token;
	}

	private auth<T extends Auth>(form: Authless<T>): Authenticated<T> {
		return {
			auth: this.token,
			...form,
		};
	}

	public async getSite() {
		return await this.http.getSite(this.auth({}));
	}

	public async getPosts(form: Authless<GetPosts>) {
		return await this.http.getPosts(this.auth(form));
	}
}
