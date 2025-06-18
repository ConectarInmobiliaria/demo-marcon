/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B46C1",   // lila (ajusta al hex exacto que prefieras)
        secondary: "#ECC94B", // amarillo
      },
    },
  },
  plugins: [],
};

