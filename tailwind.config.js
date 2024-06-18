/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#4069B0',
        mainRed: '#FF0000',
        darkRed: '#C53131',
        bgBlue: '#4069B085',
        mainGray: '#30415F',
        mainGreen: '#479E47',
        mainOrange: '#E79602'
      },
    },
  },
  plugins: [],
};

