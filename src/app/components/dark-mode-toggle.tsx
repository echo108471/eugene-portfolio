"use client";

import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function withTransitionsDisabled(fn: () => void) {
  document.documentElement.classList.add("disable-transitions");
  fn();
  window.setTimeout(() => {
    document.documentElement.classList.remove("disable-transitions");
  }, 0);
}

const DarkModeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    withTransitionsDisabled(() => {
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", nextIsDark);
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none active:outline-none"
      aria-label="Toggle dark mode"
      tabIndex={-1}
    >
      <div className="relative w-6 h-6">
        <SunIcon
          className="absolute inset-0 h-6 w-6 text-yellow-500 transform transition-all duration-500 rotate-0 scale-100 opacity-100 dark:rotate-180 dark:scale-0 dark:opacity-0"
        />
        <MoonIcon
          className="absolute inset-0 h-6 w-6 text-blue-400 transform transition-all duration-500 -rotate-180 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100"
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
