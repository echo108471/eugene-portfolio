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
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-amber-50 text-amber-700 transition-colors duration-200 group-hover:bg-amber-100 dark:bg-amber-400/10 dark:text-amber-200 dark:group-hover:bg-amber-400/20">
          <TrophyIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-none text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300" aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-base font-semibold leading-6 text-slate-950 dark:text-white">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
        {organization}
      </p>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 font-sans">
        {date}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 font-sans">
        {description}
      </p>
    </>
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-amber-200 hover:shadow-md active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-400/60 dark:hover:bg-white/[0.08]"
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
    <section className="py-8 sm:py-10">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase text-amber-600 dark:text-amber-300">
            Awards
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
            Awards & Honors.
          </h2>
        </div>
      </Reveal>

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
    </section>
  );
};

export default Awards;
