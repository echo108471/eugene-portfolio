import React from "react";
import AsciiScrambleText from "./ascii-scramble";

interface CourseItem {
  name: string;
  focus: string;
}

const coursework: CourseItem[] = [
  { name: "Operating Systems", focus: "xv6 kernel, memory paging, syscalls" },
  { name: "Distributed Systems", focus: "RPCs, consensus, fault-tolerance" },
  { name: "Data Structures & Algorithms", focus: "Graph theory, dynamic programming" },
  { name: "Computer Architecture", focus: "RISC-V pipeline, cache hierarchies" },
  { name: "Computer Networks", focus: "TCP/IP, socket I/O, routing protocols" },
  { name: "Database Systems", focus: "Relational engines, indexing, ACID" },
  { name: "Machine Learning", focus: "Neural networks, optimization, NLP" },
];

const researchLabs = [
  {
    org: "AggieWorks Product Studio",
    role: "Technical Product Manager & Engineer",
    summary: "Led cross-functional team scaling Cattlelog to 60K+ users with sub-100ms vector search.",
    tag: "cattlelog-60k",
  },
  {
    org: "Seoul National University",
    role: "Computational Genomics Researcher",
    summary: "Built data analysis pipelines for genome-scale sequence processing and molecular alignments.",
    tag: "snu-genomics",
  },
  {
    org: "ResilientDB Lab",
    role: "Decentralized Systems Prototyper",
    summary: "Engineered Byzantine Fault Tolerant file ledger prototype combining IPFS and PBFT consensus.",
    tag: "pbft-ledger",
  },
];

function EducationLogo() {
  return (
    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--paper)] transition-colors duration-200 group-hover:border-[var(--accent-edge)] shadow-sm">
      <div
        className="theme-logo h-11 w-11"
        style={
          {
            "--logo-light": "url(/education/ucd_logo_light.png)",
            "--logo-dark": "url(/education/ucd_logo_dark.png)",
          } as React.CSSProperties
        }
        role="img"
        aria-label="UC Davis logo"
      />
    </div>
  );
}

const EducationSection = () => {
  return (
    <section className="page-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">roots://education</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● academic baseline</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">07</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Education & Roots" />
          </h2>
          <span className="section-note">roots · academic baseline</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="space-y-6">
            {/* Main UC Davis Degree Card */}
            <div className="surface-card group p-6 interactive-surface">
              <div className="flex flex-col sm:flex-row items-start gap-4 pb-5 border-b border-[var(--line-faint)]">
                <EducationLogo />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="branch-pill text-[11px] py-0.5 px-2 bg-[var(--growth-wash)] text-[var(--growth-bright)] font-semibold font-mono">
                      <span className="branch-dot bg-[var(--growth)]" />
                      Class of 2026
                    </span>
                    <span className="meta-text font-mono">Sep. 2022 – Jun. 2026</span>
                  </div>

                  <h3 className="font-display text-xl font-medium text-[var(--ink)]">
                    <AsciiScrambleText text="University of California, Davis" />
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[var(--ink-soft)]">
                    Bachelor of Science in Computer Science
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="tag-pill">@ Davis, CA</span>
                    <span className="tag-pill">College of Letters & Science</span>
                    <span className="tag-pill add">Graduated Jun. 2026</span>
                  </div>
                </div>
              </div>

              {/* Coursework & Lab Research Grid */}
              <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
                <div>
                  <p className="meta-text font-mono text-xs mb-3 flex items-center gap-1.5">
                    <span className="text-[var(--growth)]">├─</span>
                    <span>Core Systems Coursework</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {coursework.map((course) => (
                      <div
                        key={course.name}
                        className="p-2.5 rounded-lg border border-[var(--line-faint)] bg-[var(--paper-glass-subtle)] hover:border-[var(--growth)] transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)]">
                          <span className="text-[var(--growth)] font-mono text-[10px]">+</span>
                          <span>{course.name}</span>
                        </div>
                        <p className="text-[11px] text-[var(--ink-faint)] font-mono mt-0.5 pl-3">
                          {course.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Lab & Campus Research */}
                <div className="space-y-3">
                  <p className="meta-text font-mono text-xs mb-3 flex items-center gap-1.5">
                    <span className="text-[var(--growth)]">├─</span>
                    <span>Research Labs & Engineering</span>
                  </p>
                  {researchLabs.map((lab) => (
                    <div
                      key={lab.tag}
                      className="p-3 rounded-lg border border-[var(--line-faint)] bg-[var(--paper-glass-subtle)] space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-[var(--ink)]">{lab.org}</span>
                        <span className="ref-chip">[{lab.tag}]</span>
                      </div>
                      <p className="text-xs text-[var(--accent)] font-medium">{lab.role}</p>
                      <p className="text-[11.5px] text-[var(--ink-soft)] leading-snug">{lab.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

