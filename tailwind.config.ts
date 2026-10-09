import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f3f6ff',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.18), 0 8px 30px rgba(79,70,229,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
