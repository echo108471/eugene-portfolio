import React from "react";
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
    company: "Sealing Technologies, a Parsons Company",
    location: "Columbia, MD",
    date: "May 2026 – Present",
    link: "https://www.sealingtech.com/",
    description: [
      "Contributing to Zepharis AI, an air-gapped local LLM platform for defensive cyber operators at the edge.",
      "Working on natural-language querying, RAG over mission documentation, and command workflows across Elastic, Vectra, and Security Onion.",
    ],
    techStack: [
      "React",
      "FastAPI",
      "vLLM",
      "Celery",
      "Python",
      "RAG",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Persist AI (YC W23)",
    location: "Sacramento, CA",
    date: "Feb. 2026 – May 2026",
    link: "https://www.persist.ai/",
    description: [
      "Built backend pieces for a 22-agent pharmaceutical formulation system: APIs, collaboration flows, and research task execution.",
      "Added 37 API endpoints plus WebSocket, SSE, and background-job paths across an 85+ service codebase, with Playwright and pytest coverage.",
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
    date: "Oct. 2024 – Jun. 2026",
    link: "https://aggieworks.org/",
    logo: "/logos/aw_logo.svg",
    description: [
      "Built daviscattlelog.com, a course search and professor data site with React, FastAPI, and PostgreSQL, reaching 40K+ unique and 6.3K+ monthly active UC Davis users.",
      "Refactored search with vector embeddings and fuzzy matching for 4× faster retrieval, and cut API latency ~90% with Redis caching and virtualization — lifting uptime from 88% to 99.9%.",
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
      "Designed and deployed PNA Tool and PNA Designer, customer-facing tools for sequence analysis and donor design.",
      "Built backend processing and validation flows that reduced manual sequence-design work.",
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
      "Automated Python analysis and visualization for multi-million-line genomic datasets.",
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
      "Built Linux/MySQL data pipelines and Neo4j visualizations to support compound screening analysis.",
    ],
    techStack: ["Linux", "MySQL", "Neo4j"],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const companyCodeForBadge = (company: string) => {
  const companyName = company
    .replace(/\([^)]*\)/g, "")
    .replace(/,.*/, "")
    .trim();

  const words = companyName
    .split(" ")
    .filter(Boolean);

  return (words.length > 1
    ? words.slice(0, 2).map((word) => word[0]).join("")
    : companyName.slice(0, 2)
  ).toLowerCase();
};

function ExperienceLogo({
  experience,
}: {
  experience: ExperienceItem;
}) {
  const baseClasses =
    "relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 flex-none items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] transition-colors duration-200 group-hover/item:border-[var(--accent-edge)]";

  if (!experience.logo && !experience.logoLight && !experience.logoDark) {
    const companyCode = companyCodeForBadge(experience.company);

    return (
      <div
        className={`${baseClasses} flex-col gap-1.5 font-mono leading-none`}
        role="img"
        aria-label={`${experience.company} badge`}
      >
        <svg
          className="h-4 w-4 text-[var(--accent)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="2.4" />
          <circle cx="6" cy="18" r="2.4" />
          <circle cx="18" cy="9" r="2.4" />
          <path d="M6 8.4v7.2M8.2 6.6c6 0 7.6 1 7.6 4.4" />
        </svg>
        <span className="text-sm font-semibold tracking-normal text-[var(--ink-soft)]">
          {companyCode}
        </span>
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
        <img
          src={experience.logo}
          alt={`${experience.company} logo`}
          width={48}
          height={48}
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

const ExperienceSection = () => {
  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Where I&apos;ve worked</h2>
          <span className="section-note">worktree · active history</span>
        </div>
        <p className="body-copy mb-8 max-w-2xl">
          The through-line: backend work tied to users, data, and operational constraints.
        </p>
      </Reveal>

      <div className="quiet-list">
        {experiences.map((experience) => {
          const experienceId = `exp-${slugify(experience.company)}`;

          const content = (
            <div className="diff-block">
              <div className="diff-gutter">
                <span className="plus">+</span>
                <span className="tilde">~</span>
              </div>
              <div className="diff-body">
                <div className="group/item surface-card interactive-surface p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <ExperienceLogo experience={experience} />

                    <div className="min-w-0 flex-1 sm:pt-1">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="meta-text mb-1">worktree · {experience.date}</p>
                          <h3 className="font-display text-xl font-medium text-[var(--ink)]">
                            {experience.company}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[var(--ink-soft)]">
                            {experience.title}
                          </p>
                        </div>

                        <div className="meta-text flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>@ {experience.location}</span>
                          {experience.link && (
                            <>
                              <span className="hidden sm:block text-[var(--line-strong)]">&bull;</span>
                              <span className="inline-flex items-center gap-1 text-[var(--ink-soft)] transition-colors group-hover/item:text-[var(--accent)]">
                                Visit <span aria-hidden="true">↗</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-[var(--ink-soft)]">
                        {experience.description.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-0.5 flex-none font-mono text-[var(--add)]">+</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {experience.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="tag-pill"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
              className="block rounded-[14px] outline-none"
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
