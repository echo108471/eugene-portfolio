import React from "react";
import { Reveal } from "./motion";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      "Python",
      "Go",
      "Java",
      "TypeScript",
      "JavaScript",
      "SQL",
      "PHP",
      "C/C++",
      "Kotlin",
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      "Node.js",
      "FastAPI",
      "Fiber",
      "Koa",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "MySQL",
    ],
  },
  {
    label: "Frontend & Realtime",
    skills: [
      "React",
      "Vite",
      "SvelteKit",
      "TailwindCSS",
      "WebSockets",
      "SSE",
      "PostHog",
    ],
  },
  {
    label: "Infra & Testing",
    skills: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Linux/Unix",
      "Bash",
      "Playwright",
      "pytest",
      "Splunk",
      "Dynatrace",
      "Jenkins",
    ],
  },
  {
    label: "Scientific & Specialty",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Neo4j",
      "CGI Scripts",
      "SOAP/XML",
      "Oracle Database",
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
