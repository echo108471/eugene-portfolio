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
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "SFMono-Regular", "Consolas", '"Liberation Mono"', "Menlo", "monospace"],
      },
      colors: {
        background: {
          light: "var(--background-light)",
          dark: "var(--background-dark)",
        },
        foreground: {
          light: "var(--foreground-light)",
          dark: "var(--foreground-dark)",
        },
        accent: {
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        innerbox: {
          light: "var(--innerbox-light)",
          dark: "var(--innerbox-dark)",
        },
        subtext: {
          light: "var(--subtext-light)",
          dark: "var(--subtext-dark)",
        },
        techstack: {
          light: "var(--techstack-light)",
          dark: "var(--techstack-dark)",
        },
        innertext: {
          light: "var(--innertext-light)",
          dark: "var(--innertext-dark)",
        },
        tinybox: {
          light: "var(--tinybox-light)",
          dark: "var(--tinybox-dark)",
        },
        header: {
          light: "var(--header-light)",
          dark: "var(--header-dark)",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
