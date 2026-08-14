import React from "react";
import AsciiScrambleText from "./ascii-scramble";

const AboutMe: React.FC = () => {
  const facts = [
    { text: "B.S. Computer Science at UC Davis, Jun. 2026", ref: "ucd-2026" },
    { text: "Backend and platform engineer with applied-AI experience", ref: "arch-core" },
    { text: "Built systems used by 500K+ monthly healthcare sessions", ref: "kaiser-scale" },
    { text: "Led course tooling to 60K+ users and 9.4K+ monthly active users", ref: "cattlelog-60k" },
  ];

  return (
    <section className="page-section about-growth-section">
      <div>
        <div className="section-head about-growth-head">
          <span className="section-num">01</span>
          <h2 className="section-title">
            <AsciiScrambleText text="About, as a diff" />
          </h2>
          <span className="section-note">bio.md · revised</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.55fr)] lg:items-start">
          <div className="diff-block">
            <div className="diff-gutter">
              <span className="tilde">~</span>
            </div>
            <div className="diff-body">
              <div className="diffbox">
                <div className="diff-head">
                  <span>bio.md</span>
                  <span>@@ -1,1 +1,3 @@</span>
                </div>
                <div className="diff-row rem">
                  <span className="sign">-</span>
                  <span className="content">I measured progress by how many features I could ship.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">
                    I&apos;m a UC Davis CS graduate focused on backend systems, platform work, and applied AI.{" "}
                    <span className="ref-chip">[ref:ucd-cs]</span>
                  </span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">
                    I&apos;ve shipped reproducible deployments, event-driven services, and multi-agent workflows.{" "}
                    <span className="ref-chip">[ref:event-driven]</span>
                  </span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">
                    I now measure the work by what reaches production: a clear outcome, observable behavior, and a system the next team can maintain.
                  </span>
                </div>
              </div>

              <a
                href="mailto:eugene.a.cho@gmail.com"
                className="link-arrow mt-6"
              >
                eugene.a.cho@gmail.com
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="meta-text">git blame · committed to main</p>
              <span className="font-mono text-[10px] text-[var(--accent)]">[author: @echo]</span>
            </div>
            <div className="grid gap-3">
              {facts.map((item) => (
                <div
                  key={item.ref}
                  className="flex items-start justify-between gap-3 border-t border-[var(--line)] pt-3 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-3">
                    <span className="mt-0.5 font-mono text-sm text-[var(--add)]">+</span>
                    <p className="body-copy text-sm">
                      {item.text}
                    </p>
                  </div>
                  <span className="ref-chip shrink-0">[{item.ref}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
