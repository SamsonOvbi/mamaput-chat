/**
 * The content array defines which files should be processed by Tailwind.
 * It globs from the ./src directory and matches HTML and TS files.
 */
// @type {import('tailwindcss').Config} 
module.exports = {
  content: [
    './src/**/*.{html, ts, scss, css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
