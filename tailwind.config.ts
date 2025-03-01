import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-lime",
    "bg-erin",
    "bg-pineapple",
    "bg-gray-200",
    "bg-gray-500",
    "bg-gray-800",
    "text-gray-200",
    "text-gray-500",
    "text-gray-800",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        lime: {
          DEFAULT: "#89F336",
        },
        erin: {
          DEFAULT: "#36F342",
        },
        pineapple: {
          DEFAULT: "#e7f336",
        },
        gray: {
          200: "#F9FAFB",
          500: "#6B7280",
          800: "#374151",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};

export default config;
