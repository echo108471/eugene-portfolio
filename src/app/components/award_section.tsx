import React from "react";
import { ArrowTopRightOnSquareIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

interface AwardCardProps {
  name: string;
  organization: string;
  link: string;
}

const AwardCard: React.FC<AwardCardProps> = ({ name, organization, link }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 transition-colors duration-200 group-hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-200 dark:group-hover:bg-indigo-400/20">
          <TrophyIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-none text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-base font-semibold leading-6 text-slate-950 dark:text-white">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {organization}
      </p>
    </>
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40"
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
      link: "https://www.scouting.org/",
    },
    {
      name: "ACSL Intermediate Division Finalist",
      organization: "American Computer Science League",
      link: "https://www.acsl.org/",
    },
    {
      name: "Ventura County Fire Department Citizen Award",
      organization: "Ventura County Fire Department",
      link: "https://vcfd.org/",
    },
  ];

  return (
    <section className="py-12 sm:py-14">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
            Awards
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
            Supporting credibility.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {awards.map((award) => (
          <AwardCard
            key={award.name}
            name={award.name}
            organization={award.organization}
            link={award.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Awards;
