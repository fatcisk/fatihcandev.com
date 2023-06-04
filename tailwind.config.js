/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#19232d",
        accent: "#00e100",
        fade: "#828c96",
        disabled: "#dce6f0",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
