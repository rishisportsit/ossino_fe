/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'game-detail': 'url("/backgrounds/gameDetailBackground.png")',
        'primary-gradient': 'var(--gradient-primary)',
        'fourth-gradient': 'var(--gradient-fourth)',
        'secondary-gradient': 'var(--gradient-secondary)',
        'third-gradient': 'var(--gradient-third)',
        'button-gradient': 'var(--gradient-button)',
        'gradient-pop-up-success': 'var(--gradient-popup-success)',
        'gradient-pop-up': 'var(--gradient-popup)',
        'gradient-pop-up-error': 'var(--gradient-popup-error)',
      },

      fontFamily: {
        'corsa-grotesk': ['corsa-grotesk', 'sans-serif'],
      },
      width: {
        close: 'calc(100% - 80px)',
        open: 'calc(100% - 250px)',
      },
      fontSize: {
        '2xl': ['1.5rem'],
        'xl': ['1.25rem'],
        'lg': ['1.125rem'],
        'base': ['1rem'],
        'sm': ['0.875rem'],
        'xs': ['0.75rem'],
        '10px': ['10px'],
        '2xs': ['0.5rem'],
      },
      screens: {
        'pre-sm': '430px',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
      boxShadow: {
        'custom-shadow-1': '0 0 50px 22px var(--shadow-1)',
        'custom-shadow-2': '0 0 60px 40px var(--shadow-2)',
        'custom-shadow-3': '0 0 60px 40px var(--shadow-3)',
        'custom-shadow-4': '0 0 40px 30px var(--shadow-4)',
        'inset-right': 'inset -4px 0 15px rgba(0, 0, 0, 0.9)',
        'elevation': '0px 8.21px 21.89px -5.47px rgba(0, 0, 0, 0.28)',
      },
      blur: {
        1: '1px',
      },
      transitionProperty: {
        width: 'width',
        opacity: 'opacity',
        margin: 'margin',
        color: 'color',
        height: 'height',
      },
      colors: {
        'base': {
          100: 'var(--base-100)',
          200: 'var(--base-200)',
          300: 'var(--base-300)',
          400: 'var(--base-400)',
          500: 'var(--base-500)',
          600: 'var(--base-600)',
          620: 'var(--base-620)',
          630: 'var(--base-630)',
          640: 'var(--base-640)',
          645: 'var(--base-645)',
          650: 'var(--base-650)',
          670: 'var(--base-670)',
          675: 'var(--base-675)',
          680: 'var(--base-680)',
          690: 'var(--base-690)',
          700: 'var(--base-700)',
          725: 'var(--base-725)',
          735: 'var(--base-735)',
          750: 'var(--base-750)',
          775: 'var(--base-775)',
          800: 'var(--base-800)',
          850: 'var(--base-850)',
          860: 'var(--base-860)',
          900: 'var(--base-900)',
        },
        'borderdefault': 'var(--borderdefault)',

        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'third': 'var(--bg-third)',

        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',

        'state-positive-bg': 'var(--state-positive-bg)',
        'state-positive': 'var(--state-positive)',
        'state-warning-bg': 'var(--state-warning-bg)',
        'state-warning': 'var(--state-warning)',
        'state-negative-bg': 'var(--state-negative-bg)',
        'state-negative': 'var(--state-negative)',

        'special-1': 'var(--special-1)',
        'special-2': 'var(--special-2)',
        'primary-1': 'hsl(var(--primary-1))',
        'primary-2': 'hsl(var(--primary-2))',
        'primary-3': 'hsl(var(--primary-3))',

        'secondary-1': 'hsl(var(--secondary-1))',
        'secondary-2': 'hsl(var(--secondary-2))',
        'secondary-3': 'hsl(var(--secondary-3))',

        'status-info': 'hsl(var(--status-info))',
        'status-success': 'hsl(var(--status-success))',
        'status-warning': 'hsl(var(--status-warning))',
        'status-error-200': 'hsl(var(--status-error-200))',
        'status-error-100': 'hsl(var(--status-error-100))',

        'accent-1': 'hsl(var(--accent-1))',
        'accent-2': 'var(--accent-2)',

        'secondary-light-1': 'var(--secondary-light-1)',
        'secondary-light-2': 'var(--secondary-light-2)',
        'secondary-light-3': 'var(--secondary-light-3)',
        'secondary-light-4': 'var(--secondary-light-4)',
        'secondary-light-5': 'var(--secondary-light-5)',
        'secondary-light-6': 'var(--secondary-light-6)',
        'secondary-light-7': 'var(--secondary-light-7)',

        'accent-live': 'var(--accent-live)',
        'accent-positive': 'var(--accent-positive)',
        'accent-negative': 'var(--accent-negative)',

        /* Gradient Color Variables */
        'gradient-secondary-dark-1': 'var(--gradient-secondary-dark-1)',
        'gradient-secondary-dark-2': 'var(--gradient-secondary-dark-2)',
        'gradient-secondary-dark-3': 'var(--gradient-secondary-dark-3)',
        'gradient-third-1': 'var(--gradient-third-1)',
        'gradient-third-2': 'var(--gradient-third-2)',
        'gradient-third-3': 'var(--gradient-third-3)',
        'gradient-third-4': 'var(--gradient-third-4)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      textColor:{
        'body-txtColor-1': 'rgb(var(--body-txtColor-1-rgb) / <alpha-value>)',
        'body-txtColor-2': 'rgb(var(--body-txtColor-2-rgb) / <alpha-value>)',
      },
      backgroundColor:{
        'background-1': 'rgb(var(--background-1-rgb) / <alpha-value>)',
        'background-2': 'rgb(var(--background-2-rgb) / <alpha-value>)',
      },
      borderColor:{
        'border-1': 'rgb(var(--border-1-rgb) / <alpha-value>)',
      },
      strokeColor:{
        'stroke-1': 'rgb(var(--stroke-1-rgb) / <alpha-value>)',
        'stroke-2': 'rgb(var(--stroke-2-rgb) / <alpha-value>)',
    },
    fillColor:{
        'fill-1': 'rgb(var(--fill-1-rgb) / <alpha-value>)',
        'fill-2': 'rgb(var(--fill-2-rgb) / <alpha-value>)',
        'fill-base-500': 'rgb(var(--fill-base-500-rgb) / <alpha-value>)',
        'fill-base-300': 'rgb(var(--fill-base-300-rgb) / <alpha-value>)',
        'fill-base-100': 'rgb(var(--fill-base-100-rgb) / <alpha-value>)',
        'fill-iconprimary': 'rgb(var(--fill-iconPrimary-rgb) / <alpha-value>)',
        
      },
      bannerBg:{
        'banner-bg':'var(--banner-bg)',
        'banner-bg-1':'var(--banner-bg-1)',
      },
      bannerTextColor:{
        'banner-textColor':'var(--banner-textColor)',
        'banner-textColor-1':'var(--banner-textColor-1)',
      },
      buttonTextColor:{
        'btn-textColor':'var(--btn-textColor)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
