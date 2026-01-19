/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a", // Main background
          yellow: "#facc15", // Primary accent (Tailwind yellow-400)
          white: "#ffffff", // Text / High contrast
          purple: "#a855f7", // Secondary accent (Tailwind purple-500)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Professional font
      },
    },
  },
  plugins: [],
};
