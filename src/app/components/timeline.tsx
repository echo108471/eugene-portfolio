"use client";

import React from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { cardHover, cardTap } from "./motion";

interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  location: string;
  description: string[];
  techStack?: string[];
  type: "work" | "education" | "award" | "organization";
}

const timelineData: TimelineItem[] = [
  {
    date: "Feb. 2026 – Present",
    title: "Software Engineer Intern",
    organization: "Persist AI (YC W23)",
    location: "Sacramento, CA",
    type: "work",
    description: [
      "Engineered a multi-agent web platform for pharmaceutical formulation workflows, integrating 22 specialized backend agents.",
    ],
    techStack: ["FastAPI", "React", "Vite", "WebSockets", "SSE", "Playwright"],
  },
  {
    date: "Jun. 2025 – Dec. 2025",
    title: "Software Engineer Intern",
    organization: "Kaiser Permanente",
    location: "Remote",
    type: "work",
    description: [
      "Built event-driven backend services for an NLP-guided pre-appointment survey and smart triage system processing over 500K monthly unique sessions.",
    ],
    techStack: ["Spring", "Koa", "Kafka", "Java", "Redis"],
  },
  {
    date: "Oct. 2024 – Present",
    title: "Software Engineer",
    organization: "AggieWorks",
    location: "Davis, CA",
    type: "organization",
    description: [
      "Built daviscattlelog.com, a course/professor insights platform reaching over 40K unique users and 6.3K+ monthly active users.",
    ],
    techStack: ["FastAPI", "React", "PostgreSQL", "Redis", "PostHog"],
  },
  {
    date: "Sep. 2024 – Jan. 2025",
    title: "Software Engineer Intern",
    organization: "PNA Bio Inc.",
    location: "Thousand Oaks, CA",
    type: "work",
    description: [
      "Designed and deployed bioinformatics web tools for molecular sequence analysis and computational design workflows.",
    ],
    techStack: ["PHP", "Python", "CGI Scripts", "HTML/CSS"],
  },
  {
    date: "Sep. 2022 – Expected Jun. 2026",
    title: "B.S. Computer Science",
    organization: "University of California, Davis",
    location: "Davis, CA",
    type: "education",
    description: [],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const typeStyles = {
  work: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  education: "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200",
  organization: "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200",
  award: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
};

const typeLabels = {
  work: "Work",
  education: "Education",
  organization: "Organization",
  award: "Award",
};

function TimelineIcon({ type }: { type: TimelineItem["type"] }) {
  if (type === "education") {
    return <AcademicCapIcon className="h-4 w-4" aria-hidden="true" />;
  }

  if (type === "organization") {
    return <BuildingOffice2Icon className="h-4 w-4" aria-hidden="true" />;
  }

  return <BriefcaseIcon className="h-4 w-4" aria-hidden="true" />;
}

const Timeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const getTargetId = (item: TimelineItem) => {
    if (item.type === "work" || item.type === "organization") {
      return `exp-${slugify(item.organization)}`;
    }

    if (item.type === "education") {
      return `edu-${slugify(item.organization)}`;
    }

    return item.type;
  };

  return (
    <section className="py-12 sm:py-14">
      <div>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
            Timeline
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
            A quick map of recent work.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Click an item to jump to its detailed section.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-7">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.organization}-${item.date}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: isEven ? 24 : -24 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex flex-col md:flex-row md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 top-6 z-10 h-4 w-4 rounded-full border-4 border-white bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-110 dark:border-slate-950 md:left-1/2 md:-translate-x-1/2" />

                  <div
                    className={`ml-8 md:ml-0 md:w-5/12 ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.button
                      type="button"
                      onClick={() => scrollToSection(getTargetId(item))}
                      whileHover={shouldReduceMotion ? undefined : cardHover}
                      whileTap={shouldReduceMotion ? undefined : cardTap}
                      className="group block w-full rounded-lg border border-slate-200 bg-white/75 p-5 text-left shadow-sm shadow-slate-900/5 transition-colors duration-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                          {item.date}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[item.type]}`}
                        >
                          <TimelineIcon type={item.type} />
                          {typeLabels[item.type]}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {item.organization}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                        {item.location}
                      </p>

                      {item.description.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700 dark:text-innertext-dark">
                          {item.description.map((desc) => (
                            <li key={desc} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500" />
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.techStack && (
                        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4 dark:border-white/10">
                          {item.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-200 group-hover:border-indigo-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-indigo-400/40"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.button>
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
