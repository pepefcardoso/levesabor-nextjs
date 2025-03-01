import type { Config } from "tailwindcss";
import colors from "./constants/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        // Custom colors
        limeGreen: { DEFAULT: colors.limeGreen },
        erinGreen: { DEFAULT: colors.erinGreen },
        pineappleYellow: { DEFAULT: colors.pineappleYellow },
        // Gray shades
        gray: {
          200: colors.gray.light,
          500: colors.gray.regular,
          800: colors.gray.dark,
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};

export default config;
