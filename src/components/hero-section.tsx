import React from "react";
import AsciiScrambleText from "./ascii-scramble";

const HeroSection: React.FC = () => {
  return (
    <div className="ascii-hero">
      <div className="ascii-hero__copy">
        {/* Top repository mount frame */}
        <div className="ascii-hero__badge-row">
          <div className="ascii-mount-bracket bg-[var(--paper-glass)] px-3 py-1.5 rounded-md border border-[var(--line-strong)] backdrop-blur-md shadow-sm">
            <span className="bracket font-mono text-[12px] text-[var(--growth)]" aria-hidden="true">┌──[</span>
            <p className="ascii-hero__path !border-0 !p-0 !bg-transparent !shadow-none">
              <span className="font-mono text-[var(--accent)] font-medium">~/eugene/main/</span>
              <AsciiScrambleText text="README.md" className="font-mono text-[var(--ink)] font-semibold" />
            </p>
            <span className="bracket font-mono text-[12px] text-[var(--growth)]" aria-hidden="true">]───[</span>
            <span className="ascii-hero__status-chip !border-0 !p-0 !bg-transparent text-[var(--growth)] font-mono">
              <span className="branch-dot" />
              arboretum live · v3.2
            </span>
            <span className="bracket font-mono text-[12px] text-[var(--growth)]" aria-hidden="true">]──</span>
          </div>
        </div>

        <div className="relative pl-5 border-l-2 border-[var(--growth-muted)] hover:border-[var(--growth)] transition-colors duration-300">
          <p className="eyebrow inline-flex items-center gap-2 bg-[var(--paper-glass-subtle)] px-2.5 py-1 rounded border border-[var(--line-faint)] backdrop-blur-sm">
            <span className="text-[var(--growth)] font-mono text-xs" aria-hidden="true">├─</span>
            <span className="text-[var(--ink)] font-semibold"><AsciiScrambleText text="Eugene Cho" /></span>
            <span className="text-[var(--ink-soft)]">· software engineer</span>
          </p>

          <h1 className="ascii-hero__title [text-shadow:0_2px_12px_var(--paper)]">
            I build systems that{" "}
            <span className="botanical-sprout-wrap group/sprout inline-flex flex-col items-center">
              <em className="transition-transform duration-300 group-hover/sprout:-translate-y-0.5">
                grow
              </em>
              <span
                className="botanical-sprout-flourish select-none font-mono text-[10px] tracking-widest text-[var(--growth-bright)] transition-all duration-300 opacity-80 group-hover/sprout:opacity-100 group-hover/sprout:scale-110"
                aria-hidden="true"
              >
                ·~*~+~*~·
              </span>
            </span>{" "}
            with the problem.
          </h1>

          <p className="ascii-hero__lede [text-shadow:0_1px_8px_var(--paper)]">
            Backend and platform engineering, applied AI under real constraints, and product
            ownership from first decision through production.
          </p>

          <div className="ascii-hero__actions">
            <a href="#experience" className="btn btn-primary group/btn shadow-sm">
              <span className="font-mono text-[11px] text-[var(--growth-bright)] group-hover/btn:text-[var(--accent)]" aria-hidden="true">[</span>
              <span>selected work</span>
              <span aria-hidden="true">↘</span>
              <span className="font-mono text-[11px] text-[var(--growth-bright)] group-hover/btn:text-[var(--accent)]" aria-hidden="true">]</span>
            </a>
            <a
              href="/EugeneChoResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary group/btn shadow-sm"
            >
              <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">[</span>
              <span>resume.pdf</span>
              <span aria-hidden="true">↗</span>
              <span className="font-mono text-[11px] opacity-70 group-hover/btn:opacity-100" aria-hidden="true">]</span>
            </a>
          </div>

          <div className="mt-8">
            <a href="#about" className="ascii-hero__scroll-cue bg-[var(--paper-glass-subtle)] px-3 py-1.5 rounded-md border border-[var(--line-faint)] backdrop-blur-sm inline-flex items-center gap-2">
              <span aria-hidden="true" className="text-[var(--growth)] font-mono">└──●───</span>
              <span className="font-mono text-[11px]">enter worktree · bio.md</span>
            </a>
          </div>
        </div>
      </div>

      <div className="ascii-hero__topology-window" aria-hidden="true">
        <div className="ascii-hero__telemetry-hud ascii-box-frame">
          <div className="ascii-hero__telemetry-header">
            <span className="font-mono text-[var(--growth)]">╭─[ arboretum://topology ]</span>
            <span className="text-[var(--growth)] font-mono">● synchronized ─╮</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key font-mono">│ render.mode</span>
            <span className="val font-mono">pixel-shadow-css │</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key font-mono">│ tree.specimen</span>
            <span className="val font-mono">ancient-spirit-tree │</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key font-mono">│ atmosphere</span>
            <span className="val font-mono">living-twilight │</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key font-mono">│ branch.waypoints</span>
            <span className="val font-mono">9 content clearings │</span>
          </div>
          <div className="ascii-hero__telemetry-row pt-1 border-t border-[var(--line-faint)] text-[var(--growth-muted)]">
            <span className="font-mono text-[10px]">╰────────────────────────────</span>
            <span className="font-mono text-[10px]">─────────╯</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
