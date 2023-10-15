module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@controllers': './src/controllers',
					'@models': './src/models',
					'@routes': './src/routes',
					'@middlewares': './src/middlewares',
					'@helpers': './src/helpers',
				},
			},
		],
	],
	ignore: ['**/*.spec.ts'],
};
