import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface SpecimenRow {
  sign: "+" | "~" | "-";
  text: string;
}

interface Specimen {
  file: string;
  range?: string;
  rows: SpecimenRow[];
}

interface ProjectCardProps {
  date: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  specimen?: Specimen;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  date,
  name,
  description,
  techStack,
  link,
  specimen,
  className = "",
}) => {
  const cardClasses = `group stage-card flex flex-col ${className}`;

  const content = (
    <>
      <span className="stage-mark" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 pl-8">
        <div className="flex items-center justify-between gap-3">
          <span className="meta-text">commit log · {date}</span>
          <span className="meta-text inline-flex items-center gap-1.5 transition-colors duration-200 group-hover:text-[var(--add)]">
            Open
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-medium text-[var(--ink)]">
          {name}
        </h3>

        {specimen && (
          <div className="spec-panel mt-4">
            <div className="spec-head">
              <span>@@ {specimen.file} @@</span>
              {specimen.range && <span className="spec-range">{specimen.range}</span>}
            </div>
            {specimen.rows.map((row) => (
              <div
                key={row.text}
                className={`diff-row ${row.sign === "+" ? "add" : row.sign === "-" ? "rem" : ""}`}
              >
                <span className="sign">{row.sign}</span>
                <span className="content">{row.text}</span>
              </div>
            ))}
          </div>
        )}

        <p className="body-copy mt-3 text-sm">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
          {techStack.map((tech) => (
            <span key={tech} className="tag-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (!link) {
    return <div className={cardClasses}>{content}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      aria-label={`Open ${name}`}
    >
      {content}
    </a>
  );
};

export default ProjectCard;
