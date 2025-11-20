/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#050505",
        accent: "#2cff79"
      },
      fontFamily: {
        sans: ["Inter", "Geist", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(44, 255, 121, 0.35)"
      }
    }
  },
  plugins: []
};
