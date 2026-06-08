import React from "react";
import { Reveal } from "./motion";

interface AwardCardProps {
  name: string;
  organization: string;
  date: string;
  link: string;
}

const AwardCard: React.FC<AwardCardProps> = ({ name, organization, date, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-3 border-t border-[var(--line)] px-4 py-4 transition-colors duration-200 first:border-t-0 hover:bg-[var(--accent-wash)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-md border border-[var(--accent-edge)] bg-[var(--accent-wash)] font-mono text-sm leading-none text-[var(--accent)]">
          <span aria-hidden="true">★</span>
        </span>
        <span className="min-w-0">
          <span className="block font-display text-base font-medium leading-6 text-[var(--ink)]">
            {name}
          </span>
          <span className="mt-0.5 block text-sm text-[var(--ink-soft)]">
            {organization}
          </span>
        </span>
      </div>
      <span className="meta-text flex items-center gap-3 pl-10 sm:justify-end sm:pl-0">
        {date}
        <span className="font-mono transition-colors duration-200 group-hover:text-[var(--accent)]" aria-hidden="true">↗</span>
      </span>
    </a>
  );
};

const Awards: React.FC = () => {
  const awards = [
    {
      name: "Eagle Scout Award",
      organization: "Boy Scouts of America",
      date: "2022",
      link: "https://www.scouting.org/",
    },
    {
      name: "ACSL Intermediate Division Finalist",
      organization: "American Computer Science League",
      date: "2022",
      link: "https://www.acsl.org/",
    },
    {
      name: "Ventura County Fire Department Citizen Award",
      organization: "Ventura County Fire Department",
      date: "2018",
      link: "https://vcfd.org/",
    },
  ];

  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">07</span>
          <h2 className="section-title">Awards & honors</h2>
          <span className="section-note">recognition</span>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="surface-card overflow-hidden">
            {awards.map((award) => (
              <AwardCard
                key={award.name}
                name={award.name}
                organization={award.organization}
                date={award.date}
                link={award.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
