export function boolEnv(env: string | undefined, default_ = false): boolean {
	if (env == undefined) return default_;

	return ["1", "true"].includes(env.toLowerCase());
}

export function mapUndef<T, U>(obj: T | undefined, fn: (obj: T) => U): U | undefined {
	if (obj == undefined) return undefined;
	return fn(obj);
}

export function mapNull<T, U>(obj: T | null, fn: (obj: T) => U): U | null {
	if (obj == null) return null;
	return fn(obj);
}
