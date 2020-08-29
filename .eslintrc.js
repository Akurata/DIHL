module.exports = {
	'env': {
		'browser': true,
		'es2020': true,
		'jquery': true,
		'amd': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'no-mixed-spaces-and-tabs': 0,
		'no-explicit-any': 0,
		'space-before-function-paren': ['error', 'never'],
		'keyword-spacing': ['error', {
			'overrides': {
				'if': {
					'after': false
				},
				'for': {
					'after': false
				},
				'while': {
					'after': false
				},
				'else': {
					'before': false
				}
			}
		}],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
