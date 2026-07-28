/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c5a880',
          light: '#e8d5b5',
          bright: '#E5A93C',
          dark: '#9a7d55',
        },
        blue: {
          brand: '#1a6bff',
          light: '#4d8fff',
          dark: '#0f4fd4',
          glow: '#3b82f6',
          deep: '#0a1628',
          mid:  '#0d1f3c',
        },
        dark: {
          DEFAULT: '#08101c',
          100:     '#0c1624',
          200:     '#0f1d2e',
          300:     '#132338',
          400:     '#182c47',
          500:     '#1e3557',
          600:     '#244066',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #c5a880 0%, #E5A93C 100%)',
        'blue-gradient':  'linear-gradient(135deg, #1a6bff 0%, #0f4fd4 100%)',
        'dark-gradient':  'linear-gradient(180deg, #08101c 0%, #0f1d2e 100%)',
        'blue-dark-grad': 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)',
        'about-bg':       'linear-gradient(135deg, #08101c 0%, #0d1f3c 60%, #0f2548 100%)',
      },
      boxShadow: {
        gold:  '0 0 24px rgba(197, 168, 128, 0.25)',
        blue:  '0 0 24px rgba(26, 107, 255, 0.35)',
        card:  '0 4px 32px rgba(0,0,0,0.6)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
};
