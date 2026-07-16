/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'admin-bg': '#120002',
        'admin-sidebar': '#2a0409',
        'admin-card': '#1e0306',
        'gold-primary': '#D4AF37',
        'gold-hover': '#B8960C',
        'text-light': '#FDF6E3',
        'text-muted': '#9A7B2E'
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
