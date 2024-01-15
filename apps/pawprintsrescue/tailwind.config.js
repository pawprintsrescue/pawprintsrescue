const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
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
};
