/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#C9A84C',
        'gold-dark': '#B8960C',
        'gold-light': '#F5E6A3',
        'gold-accent': '#C9A84C',
        'deep-maroon': '#4A0E17',
        'wine-dark': '#140003',
        'wine-medium': '#2D050B',
        'wine-light': '#4A0E17',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F6F2',
        'bg-dark': '#4A0E17',
        'text-primary': '#1A1A1A',
        'text-inverse': '#FFFFFF',
        'rich-cream': '#FDF6E3',
        'warm-ivory': '#FAF0DC',
        'text-dark': '#1A1A1A',
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
