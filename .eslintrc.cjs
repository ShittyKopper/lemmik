const tsTypechecking = {
	extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
};

module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",

			...tsTypechecking,
			parserOptions: {
				...tsTypechecking.parserOptions,
				parser: "@typescript-eslint/parser",
			},
		},
		{
			files: ["./**/*.{ts,tsx}"],
			...tsTypechecking,
		},
	],
};
