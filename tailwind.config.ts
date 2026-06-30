// FILE: tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-poppins)', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-noto-bengali)', 'var(--font-hind-siliguri)', 'sans-serif'],
      },
      colors: {
        qprimary: {
          DEFAULT: '#0D2824', // Deep Emerald/Teal-green
          hover: '#081a17',
        },
        qgold: {
          DEFAULT: '#C5A572', // Luxury Gold
          hover: '#b3925c',
        },
        qaccent: {
          DEFAULT: '#0FB5A6', // Accent Bright Teal
          hover: '#0ca395',
        },
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EA',
          300: '#EDE6DA',
          400: '#E0D5C3',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A6A6A6',
          400: '#6B6B6B',
          500: '#4A4A4A',
          600: '#333333',
          700: '#262626',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#0D2824',
          foreground: '#FDFCFA',
        },
        secondary: {
          DEFAULT: '#C5A572',
          foreground: '#1A1A1A',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#0FB5A6',
          foreground: '#FDFCFA',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#C5A572',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;