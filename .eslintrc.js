module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'standard-with-typescript',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': 'warn',
	},
};
