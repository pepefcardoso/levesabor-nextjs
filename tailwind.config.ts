import type { Config } from "tailwindcss";

const hoverAnimations = [
  "hover:underline",
  "hover:scale-105",
  "hover:font-bold",
  "hover:opacity-75",
  "hover:scale-[1.05]",
  "hover:shadow-md",
  "hover:-translate-y-0.6",
  "hover:shadow-glow",
];

const bgColors = [
  "bg-primary",
  "bg-secondary",
  "bg-tertiary",
  "bg-background",
  "bg-gray-200",
  "bg-gray-500",
  "bg-gray-800",
];

const txtColors = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-background",
  "text-gray-200",
  "text-gray-500",
  "text-gray-800",
];

const borderColors = ["border-primary", "border-secondary", "border-tertiary"];

const ringColors = ["ring-primary", "ring-secondary", "ring-tertiary"];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [...bgColors, ...txtColors, ...hoverAnimations, ...borderColors, ...ringColors],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        primary: {
          DEFAULT: "#A94A4A",
        },
        secondary: {
          DEFAULT: "#F4D793",
        },
        tertiary: {
          DEFAULT: "#889E73",
        },
        background: {
          DEFAULT: "#FFF6DA",
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
