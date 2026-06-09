
import React, { useEffect, useState } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  };

  const current = isDark ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="flag-pill"
      aria-label={`Theme: ${current}. Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title="flip --theme"
    >
      <span className="flag-pill__flag">--theme=</span>
      <span className="flag-pill__value">{current}</span>
      <span className="flag-pill__caret" aria-hidden="true">
        ▸
      </span>
    </button>
  );
};

export default DarkModeToggle;
