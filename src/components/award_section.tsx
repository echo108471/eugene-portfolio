import React from "react";
import { ArrowTopRightOnSquareIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

interface AwardCardProps {
  name: string;
  organization: string;
  date: string;
  description: string;
  link: string;
}

const AwardCard: React.FC<AwardCardProps> = ({ name, organization, date, description, link }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-[var(--add-edge)] bg-[var(--add-wash)] text-[var(--add)] transition-colors duration-200">
          <TrophyIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-none text-[var(--ink-faint)] transition-colors duration-200 group-hover:text-[var(--add)]" aria-hidden="true" />
      </div>

      <h3 className="mt-5 font-display text-base font-medium leading-6 text-[var(--ink)]">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--ink-soft)]">
        {organization}
      </p>
      <p className="meta-text mt-3">
        {date}
      </p>
      <p className="body-copy mt-2 text-sm">
        {description}
      </p>
    </>
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-card interactive-surface group block h-full p-5"
    >
      {content}
    </a>
  );
};

const Awards: React.FC = () => {
  const awards = [
    {
      name: "Eagle Scout Award",
      organization: "Boy Scouts of America",
      date: "2022",
      description: "Led a community watershed restoration project, demonstrating leadership, project management, and sustained commitment over several years.",
      link: "https://www.scouting.org/",
    },
    {
      name: "ACSL Intermediate Division Finalist",
      organization: "American Computer Science League",
      date: "2022",
      description: "Advanced to intermediate division finals in national computer science competition covering algorithmic problem-solving and programming.",
      link: "https://www.acsl.org/",
    },
    {
      name: "Ventura County Fire Department Citizen Award",
      organization: "Ventura County Fire Department",
      date: "2018",
      description: "Recognized for contributions during the Woolsey Fire recovery efforts in Ventura County.",
      link: "https://vcfd.org/",
    },
  ];

  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">07</span>
          <h2 className="section-title">Awards & honors</h2>
          <span className="section-note">notable tags</span>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {awards.map((award) => (
              <AwardCard
                key={award.name}
                name={award.name}
                organization={award.organization}
                date={award.date}
                description={award.description}
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
