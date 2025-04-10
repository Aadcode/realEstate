/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B4CB8",
      },
      fontFamily: {
        poppins: [
          "Poppins",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
