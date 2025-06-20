/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line tells Tailwind to scan all your source files for utility classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}