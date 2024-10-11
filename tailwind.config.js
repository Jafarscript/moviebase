/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "leftGradient": "#000000e5",
        "rightGradient": "#00000026"
      }
    },
  },
  plugins: [],
}

