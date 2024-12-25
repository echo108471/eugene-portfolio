import { header } from "framer-motion/client";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "var(--background-light)", // Light mode background
          dark: "var(--background-dark)",   // Dark mode background
        },
        foreground: {
          light: "var(--foreground-light)", // Light mode foreground
          dark: "var(--foreground-dark)",   // Dark mode foreground
        },
        accent: {
          light: "var(--accent-light)",     // Accent for light mode
          dark: "var(--accent-dark)",       // Accent for dark mode
        },
        innerbox: {
          light: "var(--innerbox-light)",   // Inner box for light mode
          dark: "var(--innerbox-dark)",     // Inner box for dark mode
        },
        subtext: {
          light: "var(--subtext-light)",    // Subtext for light mode
          dark: "var(--subtext-dark)",      // Subtext for dark mode
        },
        techstack: {
          light: "var(--techstack-light)",  // Tech stack for light mode
          dark: "var(--techstack-dark)",    // Tech stack for dark mode
        },
        innertext: {
          light: "var(--innertext-light)",  // Inner text for light mode
          dark: "var(--innertext-dark)",    // Inner text for dark mode
        },
        tinybox: {
          light: "var(--tinybox-light)",    // Tiny box for light mode
          dark: "var(--tinybox-dark)",      // Tiny box for dark mode
        },
        header: {
          light: "var(--header-light)",     // Header for light mode
          dark: "var(--header-dark)",       // Header for dark mode
        }

      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
