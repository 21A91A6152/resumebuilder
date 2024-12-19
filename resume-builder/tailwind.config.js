/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'top-down': 'topDown 5s ease-in-out infinite',
      },
      keyframes: {
        topDown: {
          '0%': {
            transform: 'translateY(-20px)', // Start above
          },
          '50%': {
            transform: 'translateY(0)', // Center position
          },
          '100%': {
            transform: 'translateY(-20px)', // End above
          },
        },
      },
    },
  },
  plugins: [],
}


 
