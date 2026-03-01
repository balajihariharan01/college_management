module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: '#2563EB',
                background: '#f8fafc',
                surface: '#ffffff',
                accent: '#4f46e5',

                // Keeping text defaults to avoid complete illegibility
                textDark: '#1E1E1E',
                textLight: '#F5F5F5',
            },
            fontFamily: {
                'sans': ['Inter', 'Poppins', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s forwards',
                'slide-up-delayed-2': 'slideUp 0.8s ease-out 0.4s forwards',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite linear',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            }
        },
    },
    plugins: [],
}
