import React from "react";
import AsciiScrambleText from "./ascii-scramble";

export interface SpecimenRow {
  sign: "+" | "~" | "-";
  text: string;
}

export interface Specimen {
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
  featured?: boolean;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  date,
  name,
  description,
  techStack,
  link,
  specimen,
  featured = false,
  className = "",
}) => {
  const cardClasses = `group stage-card flex flex-col ${className}`;

  const content = (
    <>
      <span className="stage-mark" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 pl-8">
        <div className="flex items-center justify-between gap-3">
          <span className="meta-text font-mono text-[11px]">
            <span className="text-[var(--growth)] mr-1" aria-hidden="true">┌─</span>
            {featured ? "featured diff" : "commit log"} · {date}
          </span>
          <span className="meta-text font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors duration-200 group-hover:text-[var(--accent)]">
            Open
            <span aria-hidden="true">↗ ┐</span>
          </span>
        </div>

        <h3 className={`mt-3 font-display font-medium text-[var(--ink)] ${featured ? "text-2xl" : "text-xl"}`}>
          <AsciiScrambleText text={name} />
        </h3>

        {featured ? (
          <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] md:items-start">
            <div className="flex h-full flex-col">
              <p className="body-copy text-sm">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5 md:mt-auto">
                {techStack.map((tech) => (
                  <span key={tech} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {specimen && (
              <div className="spec-panel">
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
          </div>
        ) : (
          <>
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
          </>
        )}
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
