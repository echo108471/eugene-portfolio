
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
      className="branch-pill branch-pill--toggle"
      aria-label={`Theme: ${current}. Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title="git checkout theme"
    >
      <span className="branch-dot" />
      <span className="branch-pill__label">theme/{current}</span>
      <span className="branch-pill__hint" aria-hidden="true">
        ⇄
      </span>
    </button>
  );
};

export default DarkModeToggle;
