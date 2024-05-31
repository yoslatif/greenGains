import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});
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
      borderColor: {
        glassBorder: "rgba(177, 177, 177, 0.63)",
        glassPeachBorder: "rgba(255, 217, 161, 0.63)",
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
        glass: "rgba(177, 177, 177, 0.38)",
        blueGlass: "rgba(0, 149, 255, 0.38)",
        peachGlass: "rgba(255, 217, 161, 0.38)",
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
        fade: "fade 1s ease var(--fade-delay) forwards",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
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
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [backfaceVisibility, addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
