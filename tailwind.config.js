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
        // Custom colors for light mode
        'light-primary': '#ffffff',
        'light-secondary': '#f0f0f0',
      },
      fontFamily: {
        calSans: ['CalSans-SemiBold', 'sans-serif'],
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        
        'dark-gradient': 'linear-gradient(135deg, #2d1d4d, #6a2e6e, #583b7c, #3d3d94, #1d2a54)',
        'light-gradient':'linear-gradient(133deg,rgba(238, 227, 238, 1) 0%, rgba(246, 248, 253, 1) 50%, rgba(230, 245, 251, 1) 100%)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
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