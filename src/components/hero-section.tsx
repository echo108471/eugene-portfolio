import React, { useEffect, useRef, useState } from "react";
import BranchGraph from "@/components/branch-graph";
import HeroSwarm from "@/components/hero-swarm";
import {
  introClassName,
  introEnabled,
  markHeroDone,
  WORD_STEP_MS,
  type IntroStage,
} from "@/hero-intro";
import { useLastCommitLabel } from "@/use-last-commit";

const HEADLINE_WORDS = "I build backend systems and own the path to production.".split(" ");

const HeroSection: React.FC = () => {
  const lastCommit = useLastCommitLabel();
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<IntroStage>(() => (introEnabled() ? "enter" : "done"));
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (stage === "done") markHeroDone();
  }, [stage]);

  const replay = () => {
    setRun((current) => current + 1);
    setStage("enter");
  };

  return (
    <div
      ref={rootRef}
      className={`hero-grid ${introClassName(stage)}`}
      style={{ "--word-step": `${WORD_STEP_MS}ms` } as React.CSSProperties}
    >
      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="minus">−</span>
          <span className="plus">+</span>
        </div>

        <div className="diff-body">
          <p className="eyebrow">
            // eugene-cho · software-engineer · last commit {lastCommit}
            <button
              type="button"
              className="hero-replay"
              onClick={replay}
              aria-label="Replay the intro animation"
            >
              ↻ replay
            </button>
          </p>
          <p className="hero-name">Eugene Cho</p>

          <div className="hero-headline">
            {/* Decorative: the prior self, struck through as the diff applies.
                Kept out of the h1 so assistive tech never reads it as current. */}
            <p className="hero-prior" aria-hidden="true">
              <span className="hero-sign">−</span>
              <span className="hero-prior__text" data-swarm="prior">
                I&apos;m learning to code and looking for my first opportunity.
              </span>
            </p>

            {/* Words are spans so the intro can land them one at a time; the h1
                still reads as one sentence because the text is always present. */}
            <h1 className="hero-current">
              <span className="hero-sign" aria-hidden="true">
                +
              </span>
              <span className="hero-current__text">
                {HEADLINE_WORDS.map((word, index) => (
                  <React.Fragment key={`${index}-${word}`}>
                    {index > 0 && " "}
                    <span className="hero-word" style={{ "--i": index } as React.CSSProperties}>
                      {word}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            </h1>
          </div>

          <p className="lede hero-lede" data-swarm="lede">
            Backend and platform engineering, applied AI under real constraints, and product
            ownership from first decision through production.
          </p>

          <div className="button-row hero-actions mt-8" data-swarm="actions">
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

      {stage !== "done" && <HeroSwarm key={run} rootRef={rootRef} onStage={setStage} />}
    </div>
  );
};

export default HeroSection;
