const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hf', ['&:hover', '&:focus']);
			addVariant('hv', ['&:hover', '&:focus-visible']);
			addVariant('group-hf', ['.group:hover &', '.group:focus &']);
			addVariant('group-hv', [
				'.group:hover &',
				'.group:focus-visible &'
			]);
		})
	]
};

module.exports = config;
