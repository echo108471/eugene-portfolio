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
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">05</span>
          <h2 className="section-title">Tools and systems</h2>
          <span className="section-note">skills.lock</span>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="grid gap-5 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="surface-card p-5"
              >
                <p className="meta-text mb-2">package · {group.label.toLowerCase()}</p>
                <h3 className="font-display text-lg font-medium text-[var(--ink)]">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="tag-pill"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
