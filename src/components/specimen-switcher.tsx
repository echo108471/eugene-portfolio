import React, { useState, useRef, useEffect } from "react";
import { useTreeTheme, TreeSpecimen } from "../use-tree-theme";

const SpecimenSwitcher: React.FC = () => {
  const { specimen, info, setSpecimen, specimens } = useTreeTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newSpecimen: TreeSpecimen) => {
    setSpecimen(newSpecimen);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="specimen-switcher-btn"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Switch Tree Specimen & Palette"
      >
        <span aria-hidden="true">{info.glyph}</span>
        <span className="font-mono text-[11px] text-[var(--growth)] font-medium">
          {info.id}
        </span>
        <span className="text-[9px] text-[var(--ink-faint)]" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          className="specimen-dropdown-menu animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono text-[var(--ink-faint)] border-b border-[var(--line-faint)] mb-1">
            --arboretum-specimen:
          </div>
          {specimens.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`specimen-dropdown-item ${
                specimen === item.id ? "active" : ""
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true">{item.glyph}</span>
                <span className="font-mono text-[11px]">{item.name}</span>
              </div>
              {specimen === item.id && (
                <span className="text-[var(--growth)] text-[10px] font-mono">
                  ● active
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecimenSwitcher;
