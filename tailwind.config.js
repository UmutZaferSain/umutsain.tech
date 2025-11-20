/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
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
