"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Reveal } from "./motion";
import "../globals.css";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  link?: string;
  logo?: string;
  logoLight?: string;
  logoDark?: string;
  description: string[];
  techStack: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer Intern",
    company: "Persist AI (YC W23)",
    location: "Sacramento, CA",
    date: "Feb. 2026 – Present",
    description: [
      "Building a multi-agent platform for pharmaceutical formulation workflows, integrating 22 specialized backend agents into a unified product surface.",
      "Implemented core APIs, real-time flows, background jobs, and automated coverage across UI, API, and end-to-end workflows.",
    ],
    techStack: [
      "FastAPI",
      "React",
      "Vite",
      "Python",
      "JavaScript",
      "WebSockets",
      "SSE",
      "Playwright",
      "pytest",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Kaiser Permanente",
    location: "Remote",
    date: "Jun. 2025 – Dec. 2025",
    link: "https://www.kaiserpermanente.com/",
    logo: "/logos/kp_logo.svg",
    description: [
      "Built event-driven backend services for an NLP-guided pre-appointment survey and triage system processing 500K+ monthly sessions.",
      "Improved patient evisit lookup performance with Redis caching changes, reducing external API calls by over 99% and median latency by 95%.",
    ],
    techStack: [
      "Spring",
      "Koa",
      "Kafka",
      "Node.js",
      "Java",
      "Redis",
      "SOAP/XML",
    ],
  },
  {
    title: "Software Engineer",
    company: "AggieWorks",
    location: "Davis, CA",
    date: "Oct. 2024 – Present",
    link: "https://aggieworks.org/",
    logo: "/logos/aw_logo.svg",
    description: [
      "Built daviscattlelog.com, a course and professor insights platform for UC Davis students that reached 40K+ unique users.",
      "Improved search, rendering, and caching paths to cut latency and redundant traffic while supporting higher uptime.",
    ],
    techStack: [
      "FastAPI",
      "React",
      "TailwindCSS",
      "PostgreSQL",
      "Vector Embeddings",
      "Fuzzy Matching",
      "Redis",
      "PostHog",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "PNA Bio Inc.",
    location: "Thousand Oaks, CA",
    date: "Sep. 2024 – Jan. 2025",
    link: "https://www.pnabio.com/",
    logoLight: "/logos/pna_logo_light.svg",
    logoDark: "/logos/pna_logo_dark.svg",
    description: [
      "Designed and deployed PNA Tool and PNA Designer, customer-facing bioinformatics tools used for molecular sequence analysis and donor design.",
      "Built backend processing and validation flows that automated internal scientific design work and reduced manual processing time.",
    ],
    techStack: ["PHP", "Python", "CGI Scripts", "HTML/CSS", "Input Validation"],
  },
  {
    title: "Bioinformatics Research Intern",
    company: "Seoul National University Medical School",
    location: "Seoul, Korea",
    date: "Jun. 2024 – Sep. 2024",
    link: "https://snumrc.snu.ac.kr/gmi/en",
    logoLight: "/logos/snu_logo_light.svg",
    logoDark: "/logos/snu_logo_dark.svg",
    description: [
      "Researched cancer clonal model determination using genomic datasets at the Genomic Medicine Institute.",
      "Automated analysis and visualization workflows for multi-million-line genomic data using Python.",
    ],
    techStack: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "MuTect2",
      "HaplotypeCaller",
      "Seaborn",
      "Scikit-learn",
      "Dash",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "ASTRO Tech",
    location: "Remote",
    date: "Jun. 2023 – Sep. 2023",
    logo: "/logos/astro-tech.svg",
    description: [
      "Developed a Kotlin Android application for timed control of LED light switches and dynamic scene management.",
    ],
    techStack: ["Kotlin", "Android Studio"],
  },
  {
    title: "Chemoinformatics Intern",
    company: "CIMPLRX",
    location: "Seoul, Korea",
    date: "Jun. 2022 – Sep. 2022",
    link: "https://cimplrx.com/",
    logoLight: "/logos/cimplrx_logo_light.webp",
    logoDark: "/logos/cimplrx_logo_dark.png",
    description: [
      "Built Linux/MySQL data workflows and Neo4j visualizations to support compound screening analysis.",
    ],
    techStack: ["Linux", "MySQL", "Neo4j"],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ExperienceLogo({
  experience,
  priority,
}: {
  experience: ExperienceItem;
  priority: boolean;
}) {
  const baseClasses =
    "relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 flex-none items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1120] transition-colors duration-200 group-hover/item:border-slate-300 dark:group-hover/item:border-white/20";

  if (!experience.logo && !experience.logoLight && !experience.logoDark) {
    const initials = experience.company
      .replace(/\([^)]*\)/g, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    return (
      <div className={`${baseClasses} text-sm font-semibold text-slate-600 dark:text-slate-300`}>
        {initials}
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {(experience.logoLight || experience.logoDark) && (
        <div
          className="theme-logo h-10 w-10 sm:h-12 sm:w-12"
          style={
            {
              "--logo-light": `url(${experience.logoLight})`,
              "--logo-dark": `url(${experience.logoDark})`,
            } as React.CSSProperties
          }
          role="img"
          aria-label={`${experience.company} logo`}
        />
      )}

      {experience.logo && !experience.logoLight && !experience.logoDark && (
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          width={48}
          height={48}
          priority={priority}
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

const ExperienceSection = () => {
  return (
    <section className="py-12 sm:py-14">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
              Experience
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
              Where I&apos;ve worked.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Backend systems, product surfaces, and data-heavy tools across healthcare, education, and research.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="relative space-y-4">
        {/* Timeline Line */}
        <div 
          className="absolute left-[2.85rem] top-8 bottom-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" 
          aria-hidden="true" 
        />

        {experiences.map((experience, index) => {
          const experienceId = `exp-${slugify(experience.company)}`;

          const content = (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start group/item relative rounded-2xl sm:p-4 transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.08]">
              <ExperienceLogo experience={experience} priority={index < 2} />

              <div className="min-w-0 flex-1 sm:pt-1">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                      {experience.company}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {experience.title}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                      {experience.location}
                    </span>
                    <span className="hidden sm:block text-slate-300 dark:text-slate-600">&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
                      {experience.date}
                    </span>
                    {experience.link && (
                      <>
                        <span className="hidden sm:block text-slate-300 dark:text-slate-600">&bull;</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                          Visit
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {experience.description.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-white/50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors duration-200 group-hover/item:border-slate-300 dark:border-white/10 dark:bg-transparent dark:text-slate-400 dark:group-hover/item:border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );

          return experience.link ? (
            <a
              key={experience.company}
              id={experienceId}
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
            >
              {content}
            </a>
          ) : (
            <div key={experience.company} id={experienceId}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;
