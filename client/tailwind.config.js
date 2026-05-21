/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { primary: '#1b8a5a', secondary: '#53b174' },
      boxShadow: { glass: '0 8px 30px rgba(0,0,0,0.12)' }
    }
  },
  plugins: []
};
