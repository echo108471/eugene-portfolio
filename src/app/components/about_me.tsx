import React from "react";
import { ArrowTopRightOnSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

const AboutMe: React.FC = () => {
  const facts = [
    "B.S. Computer Science at UC Davis, expected Jun. 2026",
    "Software Engineer Intern at Persist AI (YC W23)",
    "Built systems used by 500K+ monthly healthcare sessions",
    "Shipped course tooling reaching 40K+ UC Davis students",
  ];

  return (
    <section className="py-12 sm:py-14">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.55fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-amber-600 dark:text-amber-300">
              About
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
              A bit about me.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-innertext-dark">
              Hi, I&apos;m a senior studying Computer Science at UC Davis and a
              Software Engineer Intern at Persist AI. I like building practical
              software where backend systems, product detail, and real workflows
              meet.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-innertext-dark font-sans">
              Recent work spans multi-agent platforms, patient intake systems,
              course planning tools, and bioinformatics software.
            </p>
            <a
              href="mailto:eacho@ucdavis.edu"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors duration-200 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              eacho@ucdavis.edu
              <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {facts.map((fact) => (
              <div
                key={fact}
                className="flex gap-3 rounded-lg border border-slate-200 bg-white/70 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-amber-200 hover:shadow-md active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-400/60 dark:hover:bg-white/[0.08]"
              >
                <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-emerald-500" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 font-sans">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutMe;
