/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1010px',
        xl: '1365px',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'Montserrat', 'Open Sans', 'arial', 'sans-serif'],
      },
      colors: {
        // Light mode colors
        light: {
          primary: '#004eeb',
          primaryHover: '#003ebc',
          text: {
            primary: '#101828',
            secondary: '#344054',
            tertiary: '#475467',
            quaternary: '#667085',
            trendGreen: '#107569',
            trendRed: '#bc1b06',
          },
          bg: {
            container: 'hsla(0, 0%, 100%, 0.7)',
            section: 'hsla(0, 0%, 100%, 0.4)',
            button: '#fff',
          },
          border: {
            primary: '#d0d5dd',
          },
        },
        // Dark mode colors
        dark: {
          primary: '#3f9dff',
          primaryHover: '#003ebc',
          text: {
            primary: '#d6d3cd',
            secondary: '#bdb7af',
            tertiary: '#b1aaa0',
            quaternary: '#9e9589',
          },
          bg: {
            container: 'rgba(24, 26, 27, 0.7)',
            section: 'rgba(24, 26, 27, 0.4)',
            button: '#181a1b',
          },
          border: {
            primary: '#3b4043',
          },
        },
      },
        backgroundImage: {
'fade-lr': 'linear-gradient(to right, #eeebf3 0%, #eadfe4 30%)',
},
    },
  },
  plugins: [],
}


