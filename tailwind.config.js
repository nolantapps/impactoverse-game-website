/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for dark mode
        'dark-primary': '#1E034B',
        'dark-primary-lighter': '#16023683',
        'dark-secondary': '#9762b3',
        'btn-color':'#8358ff',
        'btn-hover-color':'#7649FCFF',
        // Custom colors for light mode
        'light-primary': '#ffffff',
        'light-secondary': '#f0f0f0',
        'dark-background':"#0d102d",
        'light-background': '#ffffff',
      },
      fontFamily: {
        calSans: ['CalSans-SemiBold', 'sans-serif'],
      },
      keyframes: {
        gradientBorder: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-border': 'gradientBorder 5s linear infinite',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        'dark-gradient-img': `url(/pictures/dark-gradient.jpeg)`,
        'light-gradient-img': `url(/pictures/light-gradient.jpeg)`,
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '110': '1.10',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover', 'focus'],
      backgroundColor: ['dark', 'dark-hover'],
      textColor: ['dark', 'dark-hover'],
      borderColor: ['dark', 'dark-hover'],
    },
  },
  plugins: [daisyui,require('@tailwindcss/forms'),require('tailwindcss-filters'),],
}