/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#f6e6ff",
        "inverse-on-surface": "#313030",
        "on-surface-variant": "#49454f",
        "on-surface": "#1d1b20",
        "surface-container-high": "#e6e1e5",
        "primary-container": "#f1dbff",
        "on-secondary-container": "#1d192b",
        "surface-container-highest": "#e6e1e5",
        "surface-container-low": "#f7f2fa",
        "outline-variant": "#cac4d0",
        "outline": "#79747e",
        "surface-variant": "#e7e0eb",
        "on-tertiary-container": "#31111d",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#ffd8e4",
        "tertiary": "#7d5260",
        "on-secondary": "#ffffff",
        "secondary-container": "#e8def8",
        "secondary": "#625b71",
        "on-primary": "#ffffff",
        "primary": "#ddb8ff",
        "surface": "#fef7ff",
        "background": "#050505",
        "error": "#b3261e",
        "error-container": "#f9dedc",
        "on-error-container": "#410e0b",
        "on-error": "#ffffff",
        "inverse-surface": "#313030",
        "inverse-primary": "#d0bcff",
        "surface-bright": "#fef7ff",
        "surface-dim": "#ded8e1",
        "surface-container": "#f3edf7",
        "surface-container-lowest": "#ffffff"
      }
    },
  },
  plugins: [],
}
