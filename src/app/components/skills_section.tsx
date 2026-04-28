import React from "react";
import { Reveal } from "./motion";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      "Python",
      "Go",
      "Java",
      "C/C++",
      "C#",
      "Kotlin",
      "SQL",
      "JavaScript",
      "TypeScript",
      "PHP",
      "HTML/CSS",
      "R",
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Svelte",
      "SvelteKit",
      "FastAPI",
      "Flask",
      "Fiber",
      "Koa",
      "Django",
      "Spring",
      "Spring Boot",
    ],
  },
  {
    label: "Data, Messaging, & Cloud",
    skills: [
      "PostgreSQL",
      "SQLite",
      "MySQL",
      "Oracle Database",
      "Redis",
      "Kafka",
      "DigitalOcean",
      "Oracle Cloud",
      "Kubernetes",
    ],
  },
  {
    label: "Developer Tools",
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Linux/Unix",
      "Bash",
      "PostHog",
      "Lens",
      "Splunk",
      "Dynatrace",
      "Jenkins",
      "Jest",
      "Jtest",
      "LaTeX",
    ],
  },
  {
    label: "Methodologies",
    skills: [
      "Scrum/Agile",
      "Waterfall",
      "Circular Development",
      "DevOps",
      "CI/CD",
      "Object-Oriented Design",
      "Unit Testing",
      "Code Review",
    ],
  },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-14">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
            Technical Skills
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
            Tools and systems I work with.
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40"
          >
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">
              {group.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-200 hover:border-indigo-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
