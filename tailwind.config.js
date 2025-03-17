/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/**/*.{js,jsx,ts,tsx,css}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		"./src/app/**/*.{js,jsx,ts,tsx}",
		"./public/**/*.html",
	],
	theme: {
		extend: {
			fontFamily: {
				pokemon: ["'Press Start 2P'", "cursive"],
			},
			colors: {
				background: "#0D0D0D", // Dark background
				foreground: "#F5F5F5", // Light foreground for contrast
				card: {
					DEFAULT: "#1E1E1E",
					foreground: "#FFD700", // Gold text for readability
				},
				primary: {
					DEFAULT: "#FFCC00",
					foreground: "#000000",
				},
				secondary: {
					DEFAULT: "#CC0000",
					foreground: "#FFFFFF",
				},
				accent: {
					DEFAULT: "#0075BE",
					foreground: "#FFFFFF",
				},
				border: "#FFD700",
				ring: "#FFD700",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
