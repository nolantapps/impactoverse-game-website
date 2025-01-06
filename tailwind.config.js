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
        'dark-secondary': '#9762b3',
        // Custom colors for light mode
        'light-primary': '#ffffff',
        'light-secondary': '#f0f0f0',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        'dark-gradient': 'radial-gradient(circle, #9762b3 0%, #1E034B 70%)',
        'light-gradient': 'radial-gradient(circle, #f0f0f0 0%, #ffffff 70%)',
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
  plugins: [daisyui],
}