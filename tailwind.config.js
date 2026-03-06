/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: '#1E1E1E',
                'midnight-light': '#252525',
                'midnight-lighter': '#2D2D2D',
                orange: {
                    DEFAULT: '#E84B1E',
                    50: '#FEF3EC',
                    100: '#FDE4D4',
                    200: '#FBC5A4',
                    300: '#F8A673',
                    400: '#F58743',
                    500: '#D9480F',
                    600: '#BE3F0D',
                    700: '#9A330B',
                    800: '#762708',
                    900: '#521B06',
                },
                white: '#FFFFFF',
            },
            fontFamily: {
                syncopate: ['Syncopate', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'marquee': 'marquee 25s linear infinite',
                'marquee-reverse': 'marquee-reverse 25s linear infinite',
                'grid-move': 'grid-move 20s linear infinite',
                'spin-slow': 'spin 8s linear infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
                'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
                'letter-appear': 'letter-appear 0.5s ease-out forwards',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(217, 72, 15, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(217, 72, 15, 0.6)' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                'grid-move': {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '100px 100px' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'letter-appear': {
                    '0%': { opacity: '0', transform: 'translateY(50px) rotateX(-90deg)' },
                    '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-grid': 'linear-gradient(rgba(232, 75, 30, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 75, 30, 0.03) 1px, transparent 1px)',
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
        },
    },
    plugins: [],
}
