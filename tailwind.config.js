/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        card: 'hsl(0 0% 100%)',
        popover: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 0%)',
        'card-foreground': 'hsl(0 0% 0%)',
        'popover-foreground': 'hsl(0 0% 0%)',
        primary: {
          DEFAULT: 'hsl(15 100% 60%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(199 91% 48%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 45%)',
          foreground: 'hsl(0 0% 45%)',
        },
        accent: {
          DEFAULT: 'hsl(15 100% 60%)',
          foreground: 'hsl(0 0% 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 40% 98%)',
        },
        border: 'hsl(15 100% 60%)',
        input: 'hsl(212 23% 76%)',
        ring: 'hsl(15 100% 60%)',
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      ringColor: {
        DEFAULT: 'hsl(15 100% 60%)',
      },
      ringOffsetColor: {
        DEFAULT: 'hsl(15 100% 60%)',
      },
      ringOpacity: {
        DEFAULT: '0.5',
      },
      borderColor: {
        DEFAULT: 'hsl(15 100% 60%)',
      },
      outlineColor: {
        DEFAULT: 'hsl(15 100% 60%)',
      },
    },
  },
  plugins: [],
};