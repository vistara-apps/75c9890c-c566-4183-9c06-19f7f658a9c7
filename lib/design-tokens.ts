/**
 * Design Tokens for DreamWeaver
 * Comprehensive design system tokens for consistent UI/UX
 */

// Color System - Enhanced for better contrast and accessibility
export const colors = {
  // Primary brand colors
  primary: {
    50: 'hsl(240 100% 97%)',
    100: 'hsl(240 100% 94%)',
    200: 'hsl(240 100% 87%)',
    300: 'hsl(240 100% 78%)',
    400: 'hsl(240 100% 67%)',
    500: 'hsl(240 80% 50%)', // Main primary
    600: 'hsl(240 80% 42%)',
    700: 'hsl(240 80% 35%)',
    800: 'hsl(240 80% 28%)',
    900: 'hsl(240 80% 22%)',
    950: 'hsl(240 80% 15%)',
  },
  
  // Accent colors - Enhanced teal
  accent: {
    50: 'hsl(180 100% 97%)',
    100: 'hsl(180 100% 92%)',
    200: 'hsl(180 85% 84%)',
    300: 'hsl(180 75% 72%)',
    400: 'hsl(180 70% 60%)',
    500: 'hsl(180 70% 55%)', // Main accent
    600: 'hsl(180 70% 48%)',
    700: 'hsl(180 70% 40%)',
    800: 'hsl(180 70% 32%)',
    900: 'hsl(180 70% 25%)',
    950: 'hsl(180 70% 18%)',
  },
  
  // Semantic colors
  success: {
    50: 'hsl(142 76% 96%)',
    500: 'hsl(142 76% 45%)',
    600: 'hsl(142 76% 38%)',
  },
  
  warning: {
    50: 'hsl(48 96% 95%)',
    500: 'hsl(48 96% 53%)',
    600: 'hsl(48 96% 45%)',
  },
  
  error: {
    50: 'hsl(0 86% 97%)',
    500: 'hsl(0 86% 59%)',
    600: 'hsl(0 86% 51%)',
  },
  
  // Neutral colors - Enhanced for better contrast
  neutral: {
    0: 'hsl(0 0% 100%)',
    50: 'hsl(220 20% 98%)',
    100: 'hsl(220 15% 95%)',
    200: 'hsl(220 13% 91%)',
    300: 'hsl(220 9% 78%)',
    400: 'hsl(220 9% 65%)',
    500: 'hsl(220 9% 46%)',
    600: 'hsl(220 12% 34%)',
    700: 'hsl(220 16% 22%)',
    800: 'hsl(220 20% 14%)',
    900: 'hsl(220 24% 9%)',
    950: 'hsl(220 30% 5%)',
  },
  
  // Glass morphism specific colors
  glass: {
    light: 'hsla(0 0% 100% / 0.1)',
    medium: 'hsla(0 0% 100% / 0.15)',
    strong: 'hsla(0 0% 100% / 0.2)',
    border: 'hsla(0 0% 100% / 0.2)',
    backdrop: 'hsla(220 24% 9% / 0.8)',
  },
  
  // Gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, hsl(220 30% 5%) 0%, hsl(240 80% 15%) 50%, hsl(260 60% 20%) 100%)',
    card: 'linear-gradient(135deg, hsla(0 0% 100% / 0.1) 0%, hsla(0 0% 100% / 0.05) 100%)',
    accent: 'linear-gradient(135deg, hsl(240 80% 50%) 0%, hsl(180 70% 55%) 100%)',
  },
} as const;

// Typography System
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

// Spacing System - Enhanced for better rhythm
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
} as const;

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.375rem',   // 6px
  base: '0.5rem',   // 8px
  md: '0.625rem',   // 10px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Shadow System - Enhanced for glass morphism
export const shadows = {
  sm: '0 1px 2px 0 hsla(220 24% 9% / 0.05)',
  base: '0 1px 3px 0 hsla(220 24% 9% / 0.1), 0 1px 2px -1px hsla(220 24% 9% / 0.1)',
  md: '0 4px 6px -1px hsla(220 24% 9% / 0.1), 0 2px 4px -2px hsla(220 24% 9% / 0.1)',
  lg: '0 10px 15px -3px hsla(220 24% 9% / 0.1), 0 4px 6px -4px hsla(220 24% 9% / 0.1)',
  xl: '0 20px 25px -5px hsla(220 24% 9% / 0.1), 0 8px 10px -6px hsla(220 24% 9% / 0.1)',
  '2xl': '0 25px 50px -12px hsla(220 24% 9% / 0.25)',
  inner: 'inset 0 2px 4px 0 hsla(220 24% 9% / 0.05)',
  
  // Glass morphism specific shadows
  glass: '0 8px 32px hsla(220 24% 9% / 0.12), 0 4px 16px hsla(220 24% 9% / 0.08)',
  glassHover: '0 12px 40px hsla(220 24% 9% / 0.15), 0 6px 20px hsla(220 24% 9% / 0.1)',
  glassActive: '0 4px 16px hsla(220 24% 9% / 0.08), 0 2px 8px hsla(220 24% 9% / 0.05)',
} as const;

// Animation System
export const animation = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index system
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: '2rem',    // 32px
      base: '2.5rem', // 40px
      lg: '3rem',     // 48px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      base: '0.75rem 1rem',
      lg: '1rem 1.5rem',
    },
  },
  
  input: {
    height: {
      sm: '2rem',
      base: '2.5rem',
      lg: '3rem',
    },
    padding: '0.75rem 1rem',
  },
  
  card: {
    padding: {
      sm: '1rem',
      base: '1.5rem',
      lg: '2rem',
    },
  },
} as const;

// Accessibility tokens
export const a11y = {
  focusRing: {
    width: '2px',
    offset: '2px',
    color: colors.accent[500],
  },
  
  minTouchTarget: '44px',
  
  contrast: {
    aa: 4.5,
    aaa: 7,
  },
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Animation = typeof animation;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
export type Components = typeof components;
export type A11y = typeof a11y;
