import React, { useState } from "react";
import { useLastCommitLabel } from "@/use-last-commit";

interface FocusLine {
  text: string;
  hash: string;
  date: string;
  subject: string;
}

// The hero's `+` lines, each with the commit that would have introduced it.
// Dates track the real roles in experience-section.tsx; hashes are ornamental.
const focusLines: FocusLine[] = [
  {
    text: "backend & platform engineering",
    hash: "b7d0c41",
    date: "2025-06-09",
    subject: "feat(intake): Kafka services at 500K+ sessions/mo",
  },
  {
    text: "applied AI in constrained environments",
    hash: "3f9a2e8",
    date: "2026-05-18",
    subject: "feat(zepharis): air-gapped vLLM context windows",
  },
  {
    text: "product ownership at production scale",
    hash: "c14b06d",
    date: "2024-10-02",
    subject: "feat(cattlelog): own platform through 60K+ users",
  },
];

const signals = [
  { value: "60K+", label: "Cattlelog unique users" },
  { value: "500K+", label: "monthly healthcare sessions" },
  { value: "99.9%", label: "Cattlelog uptime" },
];

const defaultFocusLine = focusLines[0];

const HeroSection: React.FC = () => {
  const lastCommit = useLastCommitLabel();
  const [blamed, setBlamed] = useState<FocusLine>(defaultFocusLine);

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
                Backend systems, <em>applied AI</em>, and products people rely on.
              </span>
            </h1>
          </div>

          <p className="lede hero-lede">
            I build backend platforms and applied-AI products—from air-gapped deployments to
            healthcare services and course search used by 60K+ people.
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

      <aside className="hero-profile" aria-label="Current engineering profile">
        <div className="diffbox">
          <div className="diff-head">
            <span>profile.md</span>
            <span>@@ current focus @@</span>
          </div>

          {focusLines.map((line) => (
            <div
              key={line.text}
              className="diff-row add blame-row"
              tabIndex={0}
              onMouseEnter={() => setBlamed(line)}
              onMouseLeave={() => setBlamed(defaultFocusLine)}
              onFocus={() => setBlamed(line)}
              onBlur={() => setBlamed(defaultFocusLine)}
            >
              <span className="sign">+</span>
              <span className="content">{line.text}</span>
              <span className="sr-only">
                {" "}
                — blame: {line.hash}, Eugene Cho, {line.date}, {line.subject}
              </span>
            </div>
          ))}
        </div>

        {/* Editor-style status line: reserves its own height so hovering a
            row annotates the box instead of shifting the layout under it. */}
        <div className="blame-readout" aria-hidden="true">
          <span className="blame-hash">{blamed.hash}</span>
          <span className="blame-meta">
            Eugene Cho · {blamed.date}
          </span>
          <span className="blame-subject">{blamed.subject}</span>
        </div>

        <div className="hero-signals" aria-label="Selected engineering outcomes">
          {signals.map((signal) => (
            <div key={signal.label} className="hero-signal">
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default HeroSection;
