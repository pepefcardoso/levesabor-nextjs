import type { Config } from "tailwindcss";
import { fontSizes, fontWeights } from "./constants/typography";

const hoverAnimations = [
  "hover:underline",
  "hover:scale-105",
  "hover:font-bold",
  "hover:opacity-75",
  "hover:scale-[1.05]",
  "hover:shadow-md",
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
  safelist: [
    ...bgColors,
    ...txtColors,
    ...hoverAnimations,
    ...borderColors,
    ...ringColors,
    ...Object.values(fontSizes),
    ...Object.values(fontWeights),
    ...Object.values(fontSizes).map((size) => `md:${size}`),
    ...Object.values(fontWeights).map((weight) => `md:${weight}`),
  ],
  theme: {
    extend: {
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
        sans: ["var(--font-inter)"],
      },
    },
  },
};

export default config;
