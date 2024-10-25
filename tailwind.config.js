/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'yt-black': '#000',
                'yt-lightblack': '#303030',
                'yt-white': '#fff',
                'yt-red': '#d91b0d',
                'yt-lightpink': '#ed8c85',
                'yt-yellow': '#ffff66',
                'yt-blue': '#000066',
                'yt-green': '#00b300',
                'yt-orange': '#ed7a15',
                'yt-gray': '#808080',
            },
            gridTemplateColumns: {
                yt: 'repeat(auto-fit, minmax(250px,1fr))',
            },
            keyframes: {
                'inside-out': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                    '50%': {
                        transform: 'scale(0.5)',
                        opacity: '0.5',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
            },
            animation: {
                'inside-out': 'inside-out 6s ease-in-out 3s forwards',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
