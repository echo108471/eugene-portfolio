import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none"
    >
      <span
        className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        }`}
      />
      <SunIcon
        className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500 transition-opacity duration-300 ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      <MoonIcon
        className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-200 transition-opacity duration-300 ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;
