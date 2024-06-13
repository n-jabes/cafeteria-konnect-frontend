/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      color: {
        'custom-blue': '#4069B0',
      },
    },
  },
  plugins: [],
};
