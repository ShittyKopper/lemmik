import { browser } from "$app/environment";
import { LemmyHttp } from "lemmy-js-client";

const USER_AGENT = "Lemmik frontend (serverside)";

// A thin abstraction around the auth param & custom fetch
export class Lemmy {
	private http: LemmyHttp;
	private token?: string;

	constructor(
		instance: string,
		options: {
			token?: string;
			fetch?: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
		},
	) {
		this.http = new LemmyHttp(instance, browser ? {} : { "user-agent": USER_AGENT }, options.fetch);
		this.token = options?.token;
	}

	public async getSite() {
		return await this.http.getSite({ auth: this.token });
	}
}
