import React, { useState } from "react";
import AsciiScrambleText from "./ascii-scramble";

export interface SpecimenRow {
  sign: "+" | "~" | "-";
  text: string;
}

export interface Specimen {
  file: string;
  range?: string;
  rows: SpecimenRow[];
  archRows?: SpecimenRow[];
  telemetryRows?: SpecimenRow[];
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
  badge?: string;
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
  badge = "commit log",
}) => {
  const [activeTab, setActiveTab] = useState<"diff" | "arch" | "telemetry">("diff");
  const cardClasses = `group stage-card flex flex-col ${className}`;

  const currentRows =
    activeTab === "arch" && specimen?.archRows
      ? specimen.archRows
      : activeTab === "telemetry" && specimen?.telemetryRows
      ? specimen.telemetryRows
      : specimen?.rows || [];

  const handleTabClick = (e: React.MouseEvent, tab: "diff" | "arch" | "telemetry") => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab(tab);
  };

  const renderSpecimenPanel = () => {
    if (!specimen) return null;

    return (
      <div className="spec-panel">
        <div className="spec-head flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
            <span>@@ {specimen.file} @@</span>
            {specimen.range && <span className="spec-range text-[var(--growth)]">[{specimen.range}]</span>}
          </div>

          {(specimen.archRows || specimen.telemetryRows) && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => handleTabClick(e, "diff")}
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono transition-colors ${
                  activeTab === "diff"
                    ? "bg-[var(--growth-wash)] text-[var(--growth-bright)] font-semibold"
                    : "text-[var(--ink-faint)] hover:text-[var(--ink)]"
                }`}
                title="View Git Diff"
              >
                diff
              </button>
              {specimen.archRows && (
                <button
                  type="button"
                  onClick={(e) => handleTabClick(e, "arch")}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono transition-colors ${
                    activeTab === "arch"
                      ? "bg-[var(--accent-wash)] text-[var(--accent)] font-semibold"
                      : "text-[var(--ink-faint)] hover:text-[var(--ink)]"
                  }`}
                  title="View Architecture Spec"
                >
                  arch
                </button>
              )}
              {specimen.telemetryRows && (
                <button
                  type="button"
                  onClick={(e) => handleTabClick(e, "telemetry")}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono transition-colors ${
                    activeTab === "telemetry"
                      ? "bg-[var(--add-wash)] text-[var(--add)] font-semibold"
                      : "text-[var(--ink-faint)] hover:text-[var(--ink)]"
                  }`}
                  title="View Telemetry Metrics"
                >
                  metrics
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-1">
          {currentRows.map((row) => (
            <div
              key={row.text}
              className={`diff-row text-xs font-mono py-1.5 px-3 ${
                row.sign === "+" ? "add" : row.sign === "-" ? "rem" : ""
              }`}
            >
              <span className={`sign font-semibold ${row.sign === "+" ? "text-[var(--add)]" : row.sign === "~" ? "text-[var(--accent)]" : "text-[var(--del)]"}`}>
                {row.sign}
              </span>
              <span className="content leading-snug">{row.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const content = (
    <>
      <span className="stage-mark" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 pl-8">
        <div className="flex items-center justify-between gap-3">
          <span className="meta-text font-mono text-[11px]">
            <span className="text-[var(--growth)] mr-1" aria-hidden="true">┌─</span>
            {featured ? "featured diff" : badge} · {date}
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
              <p className="body-copy text-sm leading-relaxed">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line-faint)] pt-5 md:mt-auto">
                {techStack.map((tech) => (
                  <span key={tech} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {renderSpecimenPanel()}
          </div>
        ) : (
          <>
            <p className="body-copy mt-2 text-sm leading-relaxed">
              {description}
            </p>

            <div className="mt-4">
              {renderSpecimenPanel()}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line-faint)] pt-4 mt-auto">
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

