import React from "react";
import AsciiScrambleText from "./ascii-scramble";

interface AwardItem {
  name: string;
  organization: string;
  date: string;
  link: string;
  summary: string;
  tag: string;
  highlight: string;
}

const awards: AwardItem[] = [
  {
    name: "Eagle Scout Award",
    organization: "Boy Scouts of America",
    date: "2022",
    link: "https://www.scouting.org/",
    summary: "Planned, raised municipal funds, and directed a 30-person volunteer team through a complete public staircase restoration project.",
    tag: "leadership · service",
    highlight: "Highest rank attained by ~6% of all scouts",
  },
  {
    name: "ACSL Intermediate Division Finalist",
    organization: "American Computer Science League",
    date: "2022",
    link: "https://www.acsl.org/",
    summary: "International competitive finalist in algorithmic problem solving, graph theory, Boolean logic, and digital assembly data structures.",
    tag: "algorithms · international",
    highlight: "Top 5% internationally in competitive round",
  },
  {
    name: "Ventura County Fire Department Citizen Award",
    organization: "Ventura County Fire Department",
    date: "2018",
    link: "https://vcfd.org/",
    summary: "Commended by VCFD leadership for emergency notification and immediate community assistance during acute wildfire threat.",
    tag: "civic · community",
    highlight: "Official citation by Fire Chief & County Board",
  },
];

const Awards: React.FC = () => {
  return (
    <section className="page-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">tags/milestones // honors</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 3 verified tags</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">08</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Recognition & Milestones" />
          </h2>
          <span className="section-note">tags/milestones · service</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="grid gap-4 md:grid-cols-3">
            {awards.map((award) => (
              <a
                key={award.name}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card interactive-surface group p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 block"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--line-faint)]">
                    <span className="ref-chip">[{award.tag}]</span>
                    <span className="font-mono text-xs text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      {award.date} <span aria-hidden="true">↗</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-2">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-[var(--accent-edge)] bg-[var(--accent-wash)] font-mono text-xs text-[var(--accent)]">
                      ★
                    </span>
                    <div>
                      <h3 className="font-display text-base font-medium text-[var(--ink)] leading-snug">
                        <AsciiScrambleText text={award.name} />
                      </h3>
                      <p className="text-xs text-[var(--ink-soft)] font-medium mt-0.5">
                        {award.organization}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed mt-3">
                    {award.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--line-faint)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-faint)]">
                  <span className="text-[var(--growth)] flex items-center gap-1">
                    <span>+</span>
                    <span>{award.highlight}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;

