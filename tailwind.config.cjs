/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      body: ["'JetBrains Mono'", 'monospace'],
    },
    extend: {
      colors: {
        red: '#ff5555',
        cyan: '#8be9fd',
        pink: '#ff79c6',
        green: '#50fa7b',
        yellow: '#f1fa8c',
        purple: '#bd93f9',
      },
    },
  },
  plugins: [],
};
