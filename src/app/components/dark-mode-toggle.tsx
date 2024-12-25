import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference in localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  // Toggle dark mode and update the `html` class
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const root = document.documentElement;

      if (newMode) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return newMode;
    });
  };

  // Sync with system preference or saved preference on initial load
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      root.classList.add("dark");
    } else if (storedTheme === "light") {
      root.classList.remove("dark");
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      }
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      onMouseUp={(e) => e.currentTarget.blur()}
      className="relative inline-flex items-center h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none"
    >
      <span
        className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        }`}
      />
      {/* Sun Icon */}
      <SunIcon
        className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500 transition-opacity duration-300 ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Moon Icon */}
      <MoonIcon
        className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-200 transition-opacity duration-300 ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;
