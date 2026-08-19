import React from "react";
import AsciiScrambleText from "./ascii-scramble";

const AboutMe: React.FC = () => {
  const facts = [
    { text: "B.S. Computer Science at UC Davis, Jun. 2026", ref: "ucd-2026", cat: "academic" },
    { text: "Backend and platform engineer with applied-AI experience", ref: "arch-core", cat: "focus" },
    { text: "Built systems used by 500K+ monthly healthcare sessions", ref: "kaiser-scale", cat: "scale" },
    { text: "Led course tooling to 60K+ users and 9.4K+ monthly active users", ref: "cattlelog-60k", cat: "impact" },
  ];

  const corePillars = [
    { title: "Distributed & Event-Driven", detail: "Kafka streams, time-bucketed Redis caching, async pipelines" },
    { title: "Low-Latency Vector Retrieval", detail: "FastAPI + pgvector query planning under 100ms" },
    { title: "Air-Gapped Systems", detail: "Hardened NGINX, systemd daemonization, zero-trust provisioning" },
  ];

  return (
    <section className="page-section about-growth-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">branch 01 // bio.md</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● clean working tree</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head about-growth-head">
          <span className="section-num">01</span>
          <h2 className="section-title">
            <AsciiScrambleText text="About, as a diff" />
          </h2>
          <span className="section-note">bio.md · revised</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)] lg:items-start">
          <div className="diff-block">
            <div className="diff-gutter">
              <span className="tilde">~</span>
              <span className="plus">+</span>
              <span className="plus">+</span>
              <span className="plus">+</span>
            </div>
            <div className="diff-body">
              <div className="diffbox shadow-sm">
                <div className="diff-head">
                  <span className="font-mono">bio.md</span>
                  <span className="font-mono text-xs text-[var(--accent)]">@@ -1,1 +1,4 @@</span>
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

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:eugene.a.cho@gmail.com"
                  className="btn btn-primary group/btn text-xs py-2 px-3.5"
                >
                  <span className="font-mono text-[11px] text-[var(--growth-bright)]" aria-hidden="true">[</span>
                  <span>eugene.a.cho@gmail.com</span>
                  <span aria-hidden="true">↗</span>
                  <span className="font-mono text-[11px] text-[var(--growth-bright)]" aria-hidden="true">]</span>
                </a>
                <span className="font-mono text-xs text-[var(--ink-faint)]">
                  PGP: <span className="text-[var(--ink)]">verified</span> · based in California
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-card p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--line-faint)]">
                <p className="meta-text font-mono text-[11px]">
                  <span className="text-[var(--growth)] mr-1" aria-hidden="true">├─</span>
                  git blame · committed to main
                </p>
                <span className="font-mono text-[10px] text-[var(--accent)]">[author: @echo]</span>
              </div>
              <div className="grid gap-3">
                {facts.map((item) => (
                  <div
                    key={item.ref}
                    className="flex items-start justify-between gap-3 border-t border-[var(--line-faint)] pt-3 first:border-t-0 first:pt-0"
                  >
                    <div className="flex gap-2.5">
                      <span className="mt-0.5 font-mono text-sm text-[var(--add)] font-semibold">+</span>
                      <p className="body-copy text-xs leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                    <span className="ref-chip shrink-0">[{item.ref}]</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-5">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--line-faint)]">
                <p className="meta-text font-mono text-[11px]">
                  <span className="text-[var(--growth)] mr-1" aria-hidden="true">├─</span>
                  engineering doctrine · spec
                </p>
                <span className="font-mono text-[10px] text-[var(--growth)]">[runtime: prod]</span>
              </div>
              <div className="space-y-2.5">
                {corePillars.map((pillar) => (
                  <div key={pillar.title} className="text-xs">
                    <div className="flex items-center gap-1.5 font-mono font-medium text-[var(--ink)]">
                      <span className="text-[var(--growth)] text-[10px]" aria-hidden="true">●</span>
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-[var(--ink-soft)] text-[11px] pl-3.5 mt-0.5">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

