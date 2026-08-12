/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1a1a1a',
        accent: '#14b8a6',
        'status-ok': '#22c55e',
        'status-warning': '#f59e0b',
        'status-overdue': '#ef4444',
      },
    },
  },
  plugins: [],
};