import formsPlugin from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import safeAreaPlugin from 'tailwindcss-safe-area';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#ffcc66',
          100: '#f0bc5b',
          200: '#e1ab50',
          300: '#c38939',
          400: '#b4782e',
          500: '#a56722',
          600: '#9a5b1a',
          700: '#8f4e11',
          800: '#8b4a0e',
          900: '#87450b',
        },
      },
    },
  },
  plugins: [
    safeAreaPlugin,
    formsPlugin,
    plugin(({ addUtilities }) => {
      const clearfix = {
        '.clearfix': {
          overflow: 'auto',
        },
        '.clearfix::after': {
          content: '',
          clear: 'both',
          display: 'table',
        },
      };

      addUtilities(clearfix);
    }),
  ],
} satisfies Config;
