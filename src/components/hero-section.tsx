import React from "react";
import AsciiScrambleText from "./ascii-scramble";
import { useTreeTheme } from "../use-tree-theme";

const HeroSection: React.FC = () => {
  const { info, setSpecimen, specimens, specimen } = useTreeTheme();

  return (
    <div className="ascii-hero">
      <div className="ascii-hero__copy">
        <div className="ascii-hero__badge-row">
          <div className="ascii-mount-bracket">
            <span className="bracket font-mono text-[11px]" aria-hidden="true">├──</span>
            <p className="ascii-hero__path">
              <span className="font-mono text-[var(--accent)]">~/eugene/main/</span>
              <AsciiScrambleText text="README.md" className="font-mono" />
            </p>
          </div>
          <span className="ascii-hero__status-chip">
            <span className="branch-dot" />
            arboretum live · {info.id}
          </span>
        </div>

        <p className="eyebrow">
          <AsciiScrambleText text="Eugene Cho" /> · software engineer
        </p>

        <h1 className="ascii-hero__title">
          I build systems that{" "}
          <span className="botanical-sprout-wrap group/sprout inline-flex flex-col items-center">
            <em className="transition-transform duration-300 group-hover/sprout:-translate-y-0.5">
              grow
            </em>
            <span
              className="botanical-sprout-flourish select-none font-mono text-[10px] tracking-widest text-[var(--growth-bright)] transition-all duration-300 opacity-75 group-hover/sprout:opacity-100 group-hover/sprout:scale-110"
              aria-hidden="true"
            >
              {info.flourish}
            </span>
          </span>{" "}
          with the problem.
        </h1>

        <p className="ascii-hero__lede">
          Backend and platform engineering, applied AI under real constraints, and product
          ownership from first decision through production.
        </p>

        <div className="ascii-hero__actions">
          <a href="#experience" className="btn btn-primary group/btn">
            <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">[</span>
            <span>selected work</span>
            <span aria-hidden="true">↘</span>
            <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">]</span>
          </a>
          <a
            href="/EugeneChoResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary group/btn"
          >
            <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">[</span>
            <span>resume.pdf</span>
            <span aria-hidden="true">↗</span>
            <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">]</span>
          </a>
        </div>

        <a href="#about" className="ascii-hero__scroll-cue">
          <span aria-hidden="true">│</span>
          <span aria-hidden="true">└──●───</span>
          enter worktree · bio.md
        </a>
      </div>

      <div className="ascii-hero__shader-window" aria-hidden="true">
        <div className="ascii-hero__telemetry-hud">
          <div className="ascii-hero__telemetry-header">
            <span>╔═ arboretum://topology ═╗</span>
            <span className="text-[var(--growth)]">● {info.glyph}</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">render.mode</span>
            <span className="val font-mono">high-density-matrix</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">tree.specimen</span>
            <span className="val font-mono">{info.id}</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">palette</span>
            <span className="val font-mono">{info.paletteLabel}</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">branch.waypoints</span>
            <span className="val font-mono">8 active clearings</span>
          </div>

          <div className="mt-2 pt-2 border-t border-[var(--line-faint)] pointer-events-auto">
            <div className="text-[10px] text-[var(--ink-faint)] mb-1.5 font-mono">
              [ specimen-selector ]:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {specimens.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpecimen(item.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono transition-colors text-left border ${
                    specimen === item.id
                      ? "border-[var(--growth)] bg-[var(--growth-wash)] text-[var(--growth)] font-semibold"
                      : "border-[var(--line)] bg-[var(--paper-glass-subtle)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span aria-hidden="true">{item.glyph}</span>
                  <span className="truncate">{item.name.split(" ")[1] || item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
