const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { createThemes } = require('tw-colors');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'index.html'),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      current: colors.current,
      inherit: colors.inherit,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-safe-area'),
    createThemes(
      ({ light, dark }) => ({
        light: light({
          primary: colors.amber,
          neutral: colors.stone,
          success: colors.green,
          warning: colors.yellow,
          danger: colors.red,
          info: colors.indigo,
        }),
        dark: dark({
          primary: colors.orange,
          neutral: colors.stone,
          success: colors.green,
          warning: colors.yellow,
          danger: colors.red,
          info: colors.blue,
        }),
      }),
      {
        defaultTheme: {
          light: 'light',
          dark: 'dark',
        },
        strict: true,
        produceCssVariable: (colorName) => `--pp-${colorName}`,
        produceThemeClass: (themeName) => `theme-${themeName}`,
        produceThemeVariant: (themeName) => `theme-${themeName}`,
      },
    ),
  ],
};
