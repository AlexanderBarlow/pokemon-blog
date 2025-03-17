module.exports = {
	plugins: {
		"postcss-import": {}, // ✅ Ensures @import works
		"postcss-nesting": {}, // ✅ Enables CSS nesting
		"@tailwindcss/postcss": {}, // ✅ Use Tailwind's new PostCSS plugin
		autoprefixer: {}, // ✅ Adds browser vendor prefixes
	},
};
