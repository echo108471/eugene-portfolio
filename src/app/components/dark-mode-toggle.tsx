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
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none active:outline-none"
      aria-label="Toggle dark mode"
      tabIndex={-1}
    >
      <div className="relative w-6 h-6">
        <SunIcon
          className={`absolute inset-0 h-6 w-6 text-yellow-500 transform transition-all duration-500 ${
            isDarkMode ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 h-6 w-6 text-blue-400 transform transition-all duration-500 ${
            isDarkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
