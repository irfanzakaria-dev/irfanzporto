/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121214',
          darker: '#0d0d0f',
          card: '#18181b',
          surface: '#202024',
          slate: '#464646',
          blue: '#7693A1',
          'blue-light': '#9bb4c1',
          'blue-dark': '#557280',
          soft: '#E8E8E8',
          muted: '#8e8e93',
        },
        primary: {
          50: '#f2f6f8',
          100: '#e1ecf0',
          200: '#c5d9e3',
          300: '#9cbccf',
          400: '#7693A1', // Reference Blue Accent #7693A1
          500: '#5c7b8b',
          600: '#486371',
          700: '#3a4e5a',
          800: '#2b3b44',
          900: '#1d272d',
          950: '#11181c',
        },
        secondary: {
          50: '#f7f7f7',
          100: '#E8E8E8', // Reference Soft White #E8E8E8
          200: '#d5d5d5',
          300: '#adadad',
          400: '#757575',
          500: '#5a5a5a',
          600: '#464646', // Reference Slate Charcoal #464646
          700: '#363636',
          800: '#262626',
          900: '#18181a',
          950: '#121214',
        },
        neutral: {
          50: '#f9f9fa',
          100: '#E8E8E8',
          200: '#d9d9dc',
          300: '#b8b8be',
          400: '#8e8e96',
          500: '#676770',
          600: '#464646',
          700: '#323238',
          800: '#222226',
          900: '#18181b',
          950: '#121214',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#121214',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },
    },
  },
  plugins: [],
}
