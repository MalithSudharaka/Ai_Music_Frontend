/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#EEB15C',
          secondary: '#251721',
        },
              fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        galldis: ['Galldis', 'sans-serif'],
      },
      fontWeight: {
        'galldis-medium': '500',
        'galldis-bold': 'bold',
      },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  };
  