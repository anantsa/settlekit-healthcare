/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "var(--sk-shadow)"
      },
      borderRadius: {
        sk: "8px"
      }
    }
  },
  plugins: []
};
