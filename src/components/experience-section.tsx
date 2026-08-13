import React from "react";

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
    date: "May 2026 – Aug. 2026",
    link: "https://www.sealingtech.com/",
    description: [
      "Re-architected networking and deployment for an air-gapped AI stack, replacing hardcoded routing and a single Compose pod with hardened NGINX, independently managed systemd services, and Ansible provisioning.",
      "Owned context-window visibility for Zepharis AI from research and PRD through React, FastAPI, and vLLM implementation.",
    ],
    techStack: [
      "React",
      "FastAPI",
      "vLLM",
      "NGINX",
      "systemd",
      "Ansible",
    ],
  },
  {
    title: "Technical Product Manager",
    company: "AggieWorks (UC Davis Product Organization)",
    location: "Davis, CA",
    date: "Oct. 2024 – Jun. 2026",
    link: "https://aggieworks.org/",
    logo: "/logos/aw_logo.svg",
    description: [
      "Led the cross-functional Davis Cattlelog team as a founding member, defining roadmap and product scope as the platform grew to 60K+ unique users and 9.4K+ monthly active users.",
      "Served as primary engineer across the product stack, re-architecting search and delivery for 4× faster retrieval, 90% lower API latency, and 99.9% uptime.",
    ],
    techStack: [
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "GitHub Actions",
      "Docker Compose",
      "Prometheus",
      "Grafana",
      "Loki",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Persist AI (YC W23)",
    location: "Sacramento, CA",
    date: "Feb. 2026 – May 2026",
    link: "https://www.persist.ai/",
    description: [
      "Engineered a multi-agent web platform for pharmaceutical formulation workflows, integrating 22 specialized backend agents for project execution, collaboration, and research automation.",
      "Built and maintained 37 backend APIs across 27+ JavaScript and Python services using WebSockets, SSE, background jobs, and multi-service orchestration.",
    ],
    techStack: [
      "FastAPI",
      "React",
      "Vite",
      "Python",
      "JavaScript",
      "WebSockets",
      "SSE",
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
      "Built event-driven Spring, Express, and Kafka services for an NLP-guided patient intake and triage system processing 500K+ monthly unique sessions.",
      "Resolved a Redis cache miss pattern with time-bucketed keys and negative caching, reducing external API calls by over 99% and median latency by 95%.",
    ],
    techStack: [
      "Spring",
      "Express",
      "Kafka",
      "Java",
      "Redis",
      "SOAP/XML",
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
      "Built and deployed customer-facing molecular sequence analysis and PNA design tools using PHP, Python, and CGI scripts for a site serving 1.5K+ monthly visitors.",
      "Automated sequence-design workflows through validated data-processing pipelines, reducing manual processing time by 90%.",
    ],
    techStack: ["PHP", "Python", "CGI Scripts", "HTML/CSS", "Input Validation"],
  },
];

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
        />
      )}
    </div>
  );
}

const ExperienceSection = () => {
  return (
    <section className="page-section">
      <div>
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Where I&apos;ve worked</h2>
          <span className="section-note">worktree · active history</span>
        </div>
      </div>

      <div className="quiet-list">
        {experiences.map((experience) => {
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
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[14px] outline-none"
            >
              {content}
            </a>
          ) : (
            <div key={experience.company}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;
