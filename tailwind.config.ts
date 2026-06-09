import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        display: ['"IBM Plex Serif"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "SFMono-Regular", "Consolas", '"Liberation Mono"', "Menlo", "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
