export function boolEnv(env: string | undefined, default_ = false): boolean {
	if (env == undefined) return default_;

	return ["1", "true"].includes(env.toLowerCase());
}
