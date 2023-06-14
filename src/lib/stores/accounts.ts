import { browser } from "$app/environment";
import type { Writable } from "svelte/store";

const ACCOUNT_STORAGE_KEY = "lemmik_accts";
const CURRENT_ACCOUNT_KEY = "lemmik_acct_current";

export interface Account {
	jwt: string;
	instance: string;
}

export interface AccountContext {
	accounts: Writable<Record<string, Account>>;
	currentAccount: Writable<string | null>;
}

export function loadAccounts(
	accountsStore: Writable<Record<string, Account>>,
	currentAccountStore: Writable<string | null>,
) {
	if (!browser) throw new Error("Attempted to load in-browser accounts serverside.");

	let loading = true;
	accountsStore.subscribe((accounts) => {
		if (loading) return;
		localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts));
	});

	currentAccountStore.subscribe((idx) => {
		if (loading) return;

		if (!idx) {
			localStorage.removeItem(CURRENT_ACCOUNT_KEY);
			return;
		}

		localStorage.setItem(CURRENT_ACCOUNT_KEY, idx.toString());
	});

	const accountsJson = localStorage.getItem(ACCOUNT_STORAGE_KEY);
	if (accountsJson) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const accounts: Record<string, Account> = JSON.parse(accountsJson);
		accountsStore.set(accounts);
	}

	const accountId = localStorage.getItem(CURRENT_ACCOUNT_KEY);
	currentAccountStore.set(accountId);

	loading = false;
}
