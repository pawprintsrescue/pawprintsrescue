const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { createThemes } = require('tw-colors');
const colors = require('tailwindcss/colors');
const tailwindPreset = require('@pawprintsrescue/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  content: [
    join(__dirname, 'index.html'),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes(
      ({ light, dark }) => ({
        light: light({
          primary: colors.amber,
          neutral: colors.stone,
          success: colors.green,
          warning: colors.yellow,
          danger: colors.red,
          info: colors.blue,
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
