import React from "react";
import AsciiScrambleText from "./ascii-scramble";

interface Change {
  type: "add" | "rem";
  text: string;
}

interface Release {
  version: string;
  hash: string;
  when: string;
  changes: Change[];
}

const releases: Release[] = [
  {
    version: "v3.0",
    hash: "a9f82c1",
    when: "2026",
    changes: [
      { type: "add", text: "Reworked multi-service routing and reproducible deployments for air-gapped AI at Sealing Technologies" },
      { type: "add", text: "Shipped context-window visibility for Zepharis AI from research and PRD through implementation" },
      { type: "add", text: "Built a 22-agent platform at Persist AI — 37 APIs plus real-time and asynchronous workflows" },
      { type: "add", text: "Graduated from UC Davis with a B.S. in Computer Science" },
      { type: "rem", text: "deprecated: waiting to feel “senior enough” before owning a system" },
    ],
  },
  {
    version: "v2.0",
    hash: "e4d31a7",
    when: "2025",
    changes: [
      { type: "add", text: "Shipped event-driven backend services at Kaiser Permanente (500K+ monthly sessions)" },
      { type: "add", text: "Cut evisit latency ~95% with the right caching change, not more code" },
      { type: "add", text: "Learned to check latency charts before adding code" },
      { type: "rem", text: "deprecated: measuring progress in features built instead of impact shipped" },
    ],
  },
  {
    version: "v1.5",
    hash: "c2b18f0",
    when: "2024",
    changes: [
      { type: "add", text: "Joined AggieWorks; helped grow daviscattlelog.com to 60K+ users" },
      { type: "add", text: "Shipped Cattlelog and HangulStudy outside class deadlines" },
      { type: "add", text: "Genomics research at Seoul National University + first bioinformatics tools at PNA Bio" },
      { type: "rem", text: "deprecated: treating side projects as throwaway practice" },
    ],
  },
  {
    version: "v1.0",
    hash: "f0a91e3",
    when: "2022 — 2023",
    changes: [
      { type: "add", text: "First internships: chemoinformatics at CIMPLRX, Android at ASTRO Tech" },
      { type: "add", text: "Eagle Scout — led a staircase restoration project to completion" },
      { type: "add", text: "init — found the thing I wanted to get good at" },
    ],
  },
];

const ReleaseHistory: React.FC = () => {
  return (
    <section className="page-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">git/log // evolution</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 4 release milestones</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">06</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Personal Changelog" />
          </h2>
          <span className="section-note">git log --growth</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
          <span className="plus">+</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="space-y-5">
            {releases.map((release) => (
              <div
                key={release.version}
                className="surface-card interactive-surface p-5 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--line-faint)]">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="branch-pill text-[11px] py-0.5 px-2 bg-[var(--growth-wash)] border-[var(--growth-muted)] text-[var(--growth-bright)] font-semibold">
                      <span className="branch-dot bg-[var(--growth)]" />
                      {release.version}
                    </span>
                    <span className="text-[var(--accent)]">commit {release.hash}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--ink-faint)]">{release.when}</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  {release.changes.map((change) => (
                    <div
                      key={change.text}
                      className={`diff-row py-1.5 px-3 rounded-md ${
                        change.type === "add" ? "add bg-[var(--add-wash)]" : "rem bg-[var(--del-wash)]"
                      }`}
                    >
                      <span
                        className={`sign font-semibold flex-none ${
                          change.type === "add" ? "text-[var(--add)]" : "text-[var(--del)]"
                        }`}
                      >
                        {change.type === "add" ? "+" : "-"}
                      </span>
                      <span className="content leading-relaxed">{change.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseHistory;

