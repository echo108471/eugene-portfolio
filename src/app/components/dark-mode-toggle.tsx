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
      type="button"
      onClick={toggleDarkMode}
      className="relative rounded-lg border border-slate-200 bg-white/70 p-2 text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
      aria-label="Toggle dark mode"
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
