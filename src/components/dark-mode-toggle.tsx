
import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const DarkModeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextIsDark);
  };

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="icon-button relative"
      aria-label="Toggle dark mode"
    >
      <div className="relative h-4 w-4">
        <SunIcon
          className="absolute inset-0 h-4 w-4 text-[var(--accent)] transform transition-all duration-500 rotate-0 scale-100 opacity-100 dark:rotate-180 dark:scale-0 dark:opacity-0"
        />
        <MoonIcon
          className="absolute inset-0 h-4 w-4 text-[var(--accent)] transform transition-all duration-500 -rotate-180 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100"
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
