/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f8fafc',
        secondary: '#e2e8f0',
        accent: '#cbd5e1',
      }
    },
  },
  plugins: [],
}
