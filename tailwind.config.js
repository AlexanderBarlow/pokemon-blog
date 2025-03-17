/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode support
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["'Press Start 2P'", "cursive"], // Retro Pokémon font
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#0D0D0D", // Dark background
        foreground: "#E5E5E5",
        card: {
          DEFAULT: "#1E1E1E", // Darker card color
          foreground: "#FFD700", // Gold text
        },
        primary: {
          DEFAULT: "#FFCC00", // Pokémon Yellow
          foreground: "#000",
        },
        secondary: {
          DEFAULT: "#CC0000", // Pokémon Red
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0075BE", // Pokémon Blue
          foreground: "#FFFFFF",
        },
        border: "#FFD700", // Gold border
        ring: "#FFD700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
