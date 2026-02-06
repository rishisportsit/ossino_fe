/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* ===================================
         OPTIMIZED COLOR SYSTEM
         Using semantic naming + HSL for flexibility
         =================================== */
      colors: {
        // Brand colors (with automatic opacity support)
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          dim: 'hsl(var(--color-primary) / 0.2)',
          bright: 'hsl(var(--color-primary) / 1)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          dim: 'hsl(var(--color-secondary) / 0.2)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          dim: 'hsl(var(--color-accent) / 0.2)',
        },
        tertiary: 'hsl(var(--color-tertiary) / <alpha-value>)',

        // Semantic colors
        success: 'hsl(var(--color-success) / <alpha-value>)',
        error: 'hsl(var(--color-error) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        info: 'hsl(var(--color-info) / <alpha-value>)',

        // Surface colors (backgrounds)
        surface: {
          base: 'hsl(var(--surface-base) / <alpha-value>)',
          elevated: 'hsl(var(--surface-elevated) / <alpha-value>)',
          overlay: 'hsl(var(--surface-overlay) / <alpha-value>)',
          interactive: 'hsl(var(--surface-interactive) / <alpha-value>)',
        },

        // Text colors
        text: {
          base: 'hsl(var(--text-base) / <alpha-value>)',
          muted: 'hsl(var(--text-muted) / <alpha-value>)',
          subtle: 'hsl(var(--text-subtle) / <alpha-value>)',
          // Custom semantic text color for body
          'body-txtColor-1': 'hsl(var(--text-base) / <alpha-value>)',
          'body-txtColor-2': 'hsl(var(--fill-1) / <alpha-value>)',
          // Icon colors
          'icon-active': 'hsl(var(--icon-active) / <alpha-value>)',
          'icon-inactive': 'hsl(var(--icon-inactive) / <alpha-value>)',
          // Tab text
          'tab-active': 'hsl(var(--tab-active-text) / <alpha-value>)',
          'tab-inactive': 'hsl(var(--tab-inactive-text) / <alpha-value>)',
        },

        // Border colors
        border: {
          base: 'hsl(var(--border-base) / <alpha-value>)',
          focus: 'hsl(var(--border-focus) / <alpha-value>)',
        },

        // Backwards compatibility - Primary variants
        'primary-1': 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-2': 'color-mix(in oklch, hsl(var(--color-primary)) 75%, white 25%);',
        'primary-3': 'color-mix(in oklch, hsl(var(--color-primary)) 45%, white 55%)',
        
        // Backwards compatibility - Secondary variants
        'secondary-1': 'hsl(var(--color-secondary) / <alpha-value>)',
        'secondary-2': 'color-mix(in oklch, hsl(var(--color-secondary)) 75%, white 25%)',
        'secondary-3': 'color-mix(in oklch, hsl(var(--color-secondary)) 45%, white 55%)',
        
        // Secondary light variants (gaming colors)
        'secondary-light-1': 'color-mix(in oklch, hsl(var(--color-secondary)) 35%, white 65%)',
        'secondary-light-2': 'color-mix(in oklch, hsl(var(--color-secondary)) 80%, white 20%)',
        'secondary-light-3': 'color-mix(in oklch, hsl(var(--color-secondary)) 75%, white 25%)',
        'secondary-light-4': 'color-mix(in oklch, hsl(var(--color-secondary)) 70%, white 30%)',
        'secondary-light-5': 'color-mix(in oklch, hsl(var(--color-secondary)) 78%, white 22%)',
        'secondary-light-6': 'color-mix(in oklch, hsl(var(--color-secondary)) 73%, white 27%)',
        'secondary-light-7': 'color-mix(in oklch, hsl(var(--color-secondary)) 71%, white 29%)',
        
        // Accent variants
        'accent-1': 'hsl(var(--color-accent) / <alpha-value>)',
        'accent-2': 'color-mix(in oklch, hsl(var(--color-accent)) 80%, hsl(var(--color-tertiary)) 20%)',
        'accent-3': 'hsl(var(--color-tertiary))',
        'accent-4': 'color-mix(in oklch, hsl(var(--color-secondary)) 85%, hsl(var(--color-primary)) 15%)',
        'accent-live': 'var(--accent-live)',
        'accent-positive': 'var(--accent-positive)',
        'accent-negative': 'var(--accent-negative)',
        
        // Status colors (backwards compatibility)
        'status-success': 'hsl(var(--status-success) / <alpha-value>)',
        'status-error-100': 'hsl(var(--status-error-100) / <alpha-value>)',
        'status-error-200': 'hsl(var(--status-error-200) / <alpha-value>)',
        'status-warning': 'hsl(var(--status-warning) / <alpha-value>)',
        'status-info': 'hsl(var(--status-info) / <alpha-value>)',
        
        // State colors
        'state-positive': 'var(--state-positive)',
        'state-positive-bg': 'var(--state-positive-bg)',
        'state-negative': 'var(--state-negative)',
        'state-negative-bg': 'var(--state-negative-bg)',
        'state-warning': 'var(--state-warning)',
        'state-warning-bg': 'var(--state-warning-bg)',
        
        // Special colors
        'special-1': 'var(--special-1)',
        'special-2': 'var(--special-2)',

        'fill-1': 'hsl(var(--fill-1))',
        
        // Simplified base scale (only essential shades)
        base: {
          100: 'var(--base-100)',
          300: 'var(--base-300)',
          400: 'var(--base-400)',
          500: 'var(--base-500)',
          600: 'var(--base-600)',
          700: 'var(--base-700)',
          750: 'color-mix(in oklch, var(--base-800) 95%, var(--base-700) 25%)',
          800: 'var(--base-800)',
          900: 'var(--base-900)',
        },
      },

      /* ===================================
         BACKGROUND GRADIENTS
         =================================== */
      backgroundImage: {
        'gradient-button': 'var(--gradient-button)',
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-overlay': 'var(--gradient-overlay)',
        'gradient-card-hover': 'var(--gradient-card-hover)',
        'card-gradient': 'var(--card-bg-gradient)',
        'card-gradient-strong': 'var(--card-bg-gradient-strong)',
        // Static images
        'game-detail': 'url("/backgrounds/gameDetailBackground.png")',
      },
      backgroundColor: {
        'tab-active': 'hsl(var(--tab-active-bg))',
        'tab-inactive': 'hsl(var(--tab-inactive-bg))',
      },

      /* ===================================
         TYPOGRAPHY
         =================================== */
      fontFamily: {
        'corsa-grotesk': ['corsa-grotesk', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['1.5rem'],
        'xl': ['1.25rem'],
        'lg': ['1.125rem'],
        'base': ['1rem'],
        'sm': ['0.875rem'],
        'xs': ['0.75rem'],
        '2xs': ['0.625rem'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },

      /* ===================================
         LAYOUT
         =================================== */
      width: {
        close: 'calc(100% - 80px)',
        open: 'calc(100% - 250px)',
      },
      screens: {
        'pre-sm': '430px',
      },

      /* ===================================
         EFFECTS
         =================================== */
      boxShadow: {
        'glow-primary': '0 0 40px 15px hsl(var(--color-primary) / 0.3)',
        'glow-secondary': '0 0 40px 15px hsl(var(--color-secondary) / 0.3)',
        'elevation': '0px 8px 22px -5px rgba(0, 0, 0, 0.28)',
        'inset-right': 'inset -4px 0 15px rgba(0, 0, 0, 0.9)',
      },
      blur: {
        1: '1px',
      },

      /* ===================================
         ANIMATIONS
         =================================== */
      transitionProperty: {
        width: 'width',
        margin: 'margin',
        height: 'height',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    
    // Custom plugin for theme-aware utilities
    function({ addUtilities, theme }) {
      addUtilities({
        '.text-gradient-primary': {
          'background': theme('backgroundImage.gradient-button'),
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });
    },
  ],
};
