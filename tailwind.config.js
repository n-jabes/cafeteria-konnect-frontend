/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#4069B0',
        red: '#FF0000',
        darkRed: '#C53131',
        bgBlue: '#4069B085',
        gray: '#30415F',
        green: '#479E47'
      },
    },
  },
  plugins: [],
};

