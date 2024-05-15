import type { Config } from "tailwindcss";
import Image from "next/image";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "background-gym": "url('/background.png')",
      },
      colors: {
        primary: {
          100: "#F0F4FF",
          200: "#D9E2FF",
          300: "#A6C1FF",
          400: "#598BFF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
        secondary: {
          100: "#F0F4FF",
          200: "#D9E2FF",
          300: "#A6C1FF",
          400: "#598BFF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1000px",
        xl: "2000px",
        "max-sm": { max: "480px" },
        "max-md": { max: "768px" },
        "max-lg": { max: "1000px" },
        "max-xl": { max: "2000px" },
      },
      variants: {
        display: ["group-hover"],
        visibility: ["group-hover"],
      },
      animation: {
        "slide-in": "slide-in 1s ease var(--slide-in-delay) forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            transform: "translateY(-25px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
