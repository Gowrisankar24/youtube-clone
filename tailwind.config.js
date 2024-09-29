/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'yt-black': '#000',
        'yt-lightblack': '#3f3f3f',
        'yt-white': '#fff',
        'yt-red': '#d91b0d',
        'yt-lightpink': '#ed8c85',
        'yt-yellow': '#ffff66',
        'yt-blue': '#000066',
        'yt-green': '#00b300',
        'yt-orange': '#ed7a15',
        'yt-gray': '#808080',
      },
      extend: {
        gridTemplateColumns: {
          yt: 'repeat(auto-fit, minmax(250px,1fr)',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
