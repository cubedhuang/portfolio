const postcssEach = require('postcss-each');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
	plugins: [postcssEach, tailwindcss(), autoprefixer]
};

module.exports = config;
