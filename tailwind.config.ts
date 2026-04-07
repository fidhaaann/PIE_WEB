import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'forest': {
          50:  '#e8f5f2',
          100: '#c5e6de',
          200: '#9dd4c6',
          300: '#6ec1ac',
          400: '#3fad92',
          500: '#076653',
          600: '#065c4a',
          700: '#054d3d',
          800: '#0C342C',
          900: '#06231D',
          950: '#03120f',
        },
        'lime': {
          400: '#E3EF26',
          500: '#CBDD1E',
          600: '#b0c018',
        },
        'carbon': {
          50:  '#f5f5f0',
          100: '#e8e8e0',
          900: '#111110',
          950: '#0a0a09',
        },
      },
      fontFamily: {
        display: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm':  ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.6' }],
        'fluid-base':['clamp(1rem, 0.925rem + 0.375vw, 1.125rem)', { lineHeight: '1.6' }],
        'fluid-lg':  ['clamp(1.125rem, 1rem + 0.625vw, 1.375rem)', { lineHeight: '1.5' }],
        'fluid-xl':  ['clamp(1.375rem, 1.2rem + 0.875vw, 1.875rem)', { lineHeight: '1.3' }],
        'fluid-2xl': ['clamp(1.875rem, 1.5rem + 1.875vw, 3rem)',     { lineHeight: '1.2' }],
        'fluid-3xl': ['clamp(2.5rem, 1.875rem + 3.125vw, 5rem)',     { lineHeight: '1.1' }],
        'fluid-4xl': ['clamp(3rem, 2rem + 5vw, 7rem)',               { lineHeight: '1.0' }],
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'glow':     'glow 2s ease-in-out infinite alternate',
        'spin-slow':'spin 20s linear infinite',
        'marquee':  'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 20px rgba(227,239,38,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(227,239,38,0.7)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-dark':  'linear-gradient(135deg, #06231D 0%, #0C342C 50%, #076653 100%)',
        'gradient-light': 'linear-gradient(135deg, #0C342C 0%, #076653 60%, #1a8a72 100%)',
        'lime-glow':      'radial-gradient(ellipse at center, rgba(227,239,38,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(0,0,0,0.25)',
        'card-hover':'0 12px 48px rgba(0,0,0,0.4)',
        'lime':    '0 0 30px rgba(227,239,38,0.4)',
        'lime-sm': '0 0 12px rgba(227,239,38,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
