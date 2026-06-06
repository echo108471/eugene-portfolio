import React from "react";
import { Reveal } from "./motion";

interface Change {
  type: "add" | "rem";
  text: string;
}

interface Release {
  version: string;
  when: string;
  changes: Change[];
}

// Every line traces to something real in the work history — added lines are
// what's present now, deprecated lines are a prior self genuinely outgrown.
const releases: Release[] = [
  {
    version: "v3.0",
    when: "2026 — now",
    changes: [
      { type: "add", text: "Building Zepharis AI at Sealing Technologies — an air-gapped local LLM platform for defensive cyber operators" },
      { type: "add", text: "Shipped a 22-agent platform at Persist AI (YC W23) — APIs, real-time flows, and end-to-end coverage" },
      { type: "add", text: "Graduating UC Davis CS — turning the degree into shipped systems" },
      { type: "rem", text: "deprecated: waiting to feel “senior enough” before owning a system" },
    ],
  },
  {
    version: "v2.0",
    when: "2025",
    changes: [
      { type: "add", text: "Shipped event-driven backend services at Kaiser Permanente (500K+ monthly sessions)" },
      { type: "add", text: "Cut evisit latency ~95% with the right caching change, not more code" },
      { type: "add", text: "Learned that reliability and scale are a feature, not an afterthought" },
      { type: "rem", text: "deprecated: measuring progress in features built instead of impact shipped" },
    ],
  },
  {
    version: "v1.5",
    when: "2024",
    changes: [
      { type: "add", text: "Joined AggieWorks; built daviscattlelog.com to 40K+ users" },
      { type: "add", text: "Shipped my own products start to finish (Cattlelog, HangulStudy)" },
      { type: "add", text: "Genomics research at Seoul National University + first bioinformatics tools at PNA Bio" },
      { type: "rem", text: "deprecated: treating side projects as throwaway practice" },
    ],
  },
  {
    version: "v1.0",
    when: "2022 — 2023",
    changes: [
      { type: "add", text: "First internships: chemoinformatics at CIMPLRX, Android at ASTRO Tech" },
      { type: "add", text: "Eagle Scout — led a watershed restoration project to completion" },
      { type: "add", text: "init — found the thing I wanted to get good at" },
    ],
  },
];

const ReleaseHistory: React.FC = () => {
  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">03</span>
          <h2 className="section-title">Release history</h2>
          <span className="section-note">git log --me</span>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <p className="meta-text mb-6">every version of me, diffed against the last</p>
          <div className="changelog">
            {releases.map((release) => (
              <div key={release.version} className="release">
                <div className="release-head">
                  <span className="ver">{release.version}</span>
                  <span className="when">{release.when}</span>
                  <span className="rule" />
                </div>
                {release.changes.map((change) => (
                  <div key={change.text} className={`change ${change.type}`}>
                    <span className="sign">{change.type === "add" ? "+" : "-"}</span>
                    <span className="content">{change.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseHistory;
