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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom colors for DreamWeaver
        primary: {
          DEFAULT: 'hsl(240 80% 50%)',
          hover: 'hsl(240 80% 42%)',
        },
        accent: {
          DEFAULT: 'hsl(180 70% 55%)',
          hover: 'hsl(180 70% 48%)',
        },
        'dream-blue': '#3B82F6',
        'dream-purple': '#8B5CF6',
        'dream-teal': '#14B8A6',
        success: 'hsl(142 76% 45%)',
        warning: 'hsl(48 96% 53%)',
        error: 'hsl(0 86% 59%)',
      },
      boxShadow: {
        'card': '0 8px 32px hsla(220 24% 9% / 0.12)',
        'card-hover': '0 12px 40px hsla(220 24% 9% / 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
