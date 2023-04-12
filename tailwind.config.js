/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1250px',
        },
        extend: {
            keyframes: {
                skeleton: {
                    '0%': { left: '-200%' },
                    '100%': { left: '100%' },
                },
            },
            animation: {
                skeleton: 'skeleton 0.8s linear infinite',
            },
            colors: {
                'primary-blue': '#0992C8',
                'dark-blue': '#43A9F0',
                'blue': "#BFE0EE",
                'light-blue': "#ECF4F8",
                'white-blue': "#f8f8f8",
                'blue-300': '#4DB5FE',
                'blue-350': '#3ba1ea',
                'blue-375': '#03a9f4',
                'blue-400': '#1b72e2',
                'white': '#FFF',
                'dark': '#2f3343',
                'black': '#1c212e',
                'gray': '#7d7d7d',
                'gray-100': '#E0E0E0',
                'gray-200': '#D8D8D8',
                'gray-300': '#BDBDBD',
                'gray-500': '#828282',
                'light-gray': "#dadada",
                'green': '#24ae7c',
                'red': '#EB5757',
                'orange': '#EE6E33',
                'yellow': '#f3e70b',
                'pink': '#FFF5F3',
                'purple': '#8f44fd',
                'purple-100': '#F9F4FB',
                'purple-dark': '#637BB9',
                'birch': '#4C9DA9',
                'birch-100': '#F4F6FB'
            },
            fontFamily: {
                'sans': ['Raleway', 'sans-serif']
            },
            boxShadow: {
                'gray-100': '0px 1px 5px 1px rgba(202, 202, 202, 0.25)'
            }
        },
    },
    plugins: [],
}

