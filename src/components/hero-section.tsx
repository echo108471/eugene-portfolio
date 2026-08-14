import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="ascii-hero">
      <div className="ascii-hero__copy">
        <div className="ascii-hero__badge-row">
          <p className="ascii-hero__path">
            <span className="font-mono text-[var(--accent)]">~/eugene/main/</span>README.md
          </p>
          <span className="ascii-hero__status-chip">
            <span className="branch-dot" />
            arboretum live · v3.2
          </span>
        </div>

        <p className="eyebrow">Eugene Cho · software engineer</p>

        <h1 className="ascii-hero__title">
          I build systems that <em>grow</em> with the problem.
        </h1>

        <p className="ascii-hero__lede">
          Backend and platform engineering, applied AI under real constraints, and product
          ownership from first decision through production.
        </p>

        <div className="ascii-hero__actions">
          <a href="#experience" className="btn btn-primary">
            selected work
            <span aria-hidden="true">↘</span>
          </a>
          <a
            href="/EugeneChoResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            resume.pdf
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <a href="#metrics" className="ascii-hero__scroll-cue">
          <span aria-hidden="true">│</span>
          <span aria-hidden="true">├──</span>
          enter worktree
        </a>
      </div>

      <div className="ascii-hero__shader-window" aria-hidden="true">
        <div className="ascii-hero__telemetry-hud">
          <div className="ascii-hero__telemetry-header">
            <span>arboretum://topology</span>
            <span className="text-[var(--growth)]">● synchronized</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">render.mode</span>
            <span className="val font-mono">ascii-density-matrix</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">trunk.scale</span>
            <span className="val font-mono">ancient-braided</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">branch.waypoints</span>
            <span className="val font-mono">9 active nodes</span>
          </div>
          <div className="ascii-hero__telemetry-row">
            <span className="key">growth.state</span>
            <span className="val font-mono">continuous-scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
