/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 80% 50%)',
        'primary-hover': 'hsl(240 80% 42%)',
        accent: 'hsl(180 70% 55%)',
        'accent-hover': 'hsl(180 70% 48%)',
        bg: 'hsl(220 20% 95%)',
        surface: 'hsl(220 15% 90%)',
        'dream-blue': 'hsl(220 60% 60%)',
        'dream-purple': 'hsl(260 60% 70%)',
        'dream-teal': 'hsl(180 70% 55%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(210, 40%, 50%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
