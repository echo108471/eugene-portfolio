import React from "react";
import AsciiScrambleText from "./ascii-scramble";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      "Python",
      "Java",
      "Go",
      "JavaScript",
      "TypeScript",
      "SQL",
      "C/C++",
      "PHP",
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "SvelteKit",
      "FastAPI",
      "Fiber",
      "Spring Boot",
      "vLLM",
    ],
  },
  {
    label: "Infrastructure & Data",
    skills: [
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "Podman",
      "Ansible",
      "NGINX",
      "systemd",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Git",
      "GitHub Actions",
      "Jenkins",
      "Splunk",
      "Dynatrace",
      "Linux",
    ],
  },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="page-section">
      <div>
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">
            <AsciiScrambleText text="The Root Biome" />
          </h2>
          <span className="section-note">roots · skills.lock</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="surface-card overflow-hidden">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-3 border-t border-[var(--line)] px-5 py-4 first:border-t-0 sm:grid-cols-[180px_minmax(0,1fr)]"
              >
                <div>
                  <p className="meta-text mb-1">package</p>
                  <h3 className="font-display text-base font-medium text-[var(--ink)]">
                    <AsciiScrambleText text={group.label} />
                  </h3>
                </div>
                <div className="flex min-w-0 flex-wrap gap-2">
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
