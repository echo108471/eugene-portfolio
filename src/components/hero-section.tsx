import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="ascii-hero">
      <div className="ascii-hero__copy">
        <p className="ascii-hero__path">~/eugene/main/README.md</p>
        <p className="eyebrow">Eugene Cho · software engineer</p>

        <h1 className="ascii-hero__title">
          I build systems that <em>grow</em>{" "}with the problem.
        </h1>

        <p className="lede ascii-hero__lede">
          Backend and platform engineering, applied AI under real constraints, and product
          ownership from first decision through production.
        </p>

        <div className="button-row ascii-hero__actions">
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
          <span aria-hidden="true">├─</span>
          enter worktree
        </a>
      </div>

      <div className="ascii-hero__shader-window" aria-hidden="true">
        <div className="ascii-hero__shader-head">
          <span>canvas://arboretum</span>
          <span>● live</span>
        </div>
        <div className="ascii-hero__shader-status">
          <span>$ render --mode=ascii --detail=high</span>
          <span>sunlit:light · moonlit:dark · growth:scroll</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
