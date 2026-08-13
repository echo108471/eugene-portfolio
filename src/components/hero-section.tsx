import React from "react";
import BranchGraph from "@/components/branch-graph";
import { useLastCommitLabel } from "@/use-last-commit";

const HeroSection: React.FC = () => {
  const lastCommit = useLastCommitLabel();

  return (
    <div className="hero-grid">
      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="minus">−</span>
          <span className="plus">+</span>
        </div>

        <div className="diff-body">
          <p className="eyebrow">
            // eugene-cho · software-engineer · last commit {lastCommit}
          </p>
          <p className="hero-name">Eugene Cho</p>

          <div className="hero-headline">
            {/* Decorative: the prior self, struck through as the diff applies.
                Kept out of the h1 so assistive tech never reads it as current. */}
            <p className="hero-prior" aria-hidden="true">
              <span className="hero-sign">−</span>
              <span className="hero-prior__text">
                I&apos;m learning to code and looking for my first opportunity.
              </span>
            </p>

            <h1 className="hero-current">
              <span className="hero-sign" aria-hidden="true">
                +
              </span>
              <span className="hero-current__text">
                I build backend systems and own the path to production.
              </span>
            </h1>
          </div>

          <p className="lede hero-lede">
            Backend and platform engineering, applied AI under real constraints, and product
            ownership from first decision through production.
          </p>

          <div className="button-row hero-actions mt-8">
            <a href="#experience" className="btn btn-primary">
              work
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
            <a href="mailto:eugene.a.cho@gmail.com" className="btn btn-ghost">
              email
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <BranchGraph />
    </div>
  );
};

export default HeroSection;
