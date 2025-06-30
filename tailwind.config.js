/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        red: "#ed1c24",
        black: "#212121",
        graydark: "#2f2f2f",
        graylight: "#7f8083",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
