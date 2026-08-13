import React from "react";

const AboutMe: React.FC = () => {
  const facts = [
    "B.S. Computer Science at UC Davis, Jun. 2026",
    "Backend and platform engineer with applied-AI experience",
    "Built systems used by 500K+ monthly healthcare sessions",
    "Led course tooling to 60K+ users and 9.4K+ monthly active users",
  ];

  return (
    <section className="page-section">
      <div>
        <div className="section-head">
          <span className="section-num">01</span>
          <h2 className="section-title">About, as a diff</h2>
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
                  <span className="content">I&apos;m a UC Davis CS graduate focused on backend systems, platform work, and applied AI.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">I&apos;ve shipped reproducible deployments, event-driven services, and multi-agent workflows.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">I now measure the work by what reaches production: a clear outcome, observable behavior, and a system the next team can maintain.</span>
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
            <p className="meta-text mb-4">git blame · committed to main</p>
            <div className="grid gap-3">
            {facts.map((fact) => (
              <div
                key={fact}
                className="flex gap-3 border-t border-[var(--line)] pt-3 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 font-mono text-sm text-[var(--add)]">+</span>
                <p className="body-copy text-sm">
                  {fact}
                </p>
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
