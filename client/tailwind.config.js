/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        winGlow: '0 20px 80px rgba(0, 120, 212, 0.18)',
        soft: '0 24px 70px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        winBg: '#0f172a',
        glass: 'rgba(255,255,255,0.12)',
        glassBorder: 'rgba(255,255,255,0.18)',
        accent: '#3b82f6',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
