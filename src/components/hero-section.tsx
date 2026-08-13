import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="living-hero">
      <div className="living-hero__copy">
        <p className="eyebrow">Eugene Cho · software engineer</p>

        <h1 className="living-hero__title">
          I build systems that <em>grow</em> with the problem.
        </h1>

        <p className="lede living-hero__lede">
          Backend and platform engineering, applied AI under real constraints, and product
          ownership from first decision through production.
        </p>

        <div className="button-row living-hero__actions">
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

        <a href="#about" className="living-hero__scroll-cue">
          <span className="living-hero__scroll-line" aria-hidden="true" />
          scroll to grow
        </a>
      </div>

      <div className="living-hero__visual-space" aria-hidden="true" />
    </div>
  );
};

export default HeroSection;
