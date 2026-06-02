/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#D4AF37',
        'gold-dark': '#B8960C',
        'gold-light': '#F5E6A3',
        'gold-accent': '#F3C64F',
        'deep-maroon': '#2C0A0A',
        'wine-dark': '#140003',
        'wine-medium': '#2D050B',
        'wine-light': '#4A0E17',
        'rich-cream': '#FDF6E3',
        'warm-ivory': '#FAF0DC',
        'text-dark': '#1A0A00',
        'text-muted': '#7A5C2E'
      },
      fontFamily: {
        brand: ['Playfair Display', 'serif'],
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Poppins', 'sans-serif'],
        label: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        marquee: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite'
      }
    },
  },
  plugins: [],
}
