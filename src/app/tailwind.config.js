/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // מאפשר מצב כהה לפי מחלקה
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
