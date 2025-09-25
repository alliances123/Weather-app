/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'background-start': '#1E0639',
                'background-end': '#06071C',
                'card-bg': 'rgba(255, 255, 255, 0.1)',
                'text-secondary': '#B0B0B0',
                'accent-gold': '#FFD700',
                'accent-blue': '#B0C4DE',
                'accent-sky': '#87CEEB',
            },
        },
    },
    plugins: [require("daisyui")],
}
