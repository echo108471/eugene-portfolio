import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ProjectCardProps {
  date: string;
  name: string;
  description: string;
  highlights?: string[];
  techStack: string[];
  link: string;
  image?: string;
  className?: string;
  priority?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  date,
  name,
  description,
  highlights = [],
  techStack,
  link,
  image,
  className = "",
}) => {
  const [imageError, setImageError] = React.useState(false);
  const isSvg = image?.endsWith(".svg");

  const cardClasses = `group stage-card flex h-full flex-col ${className}`;

  const content = (
    <>
      <span className="stage-mark" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 pl-8">
        <div className="flex items-center justify-between gap-3">
          <span className="meta-text">commit log · {date}</span>
          <span className="meta-text inline-flex items-center gap-1.5 transition-colors duration-200 group-hover:text-[var(--add)]">
            Open
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-medium text-[var(--ink)]">
          {name}
        </h3>

        {image && !imageError && (
          <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-[11px] border border-[var(--line)] bg-[var(--paper)]">
            <img
              src={image}
              alt={`${name} preview`}
              className={`absolute inset-0 h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.025] ${
                isSvg ? "object-contain p-5" : "object-cover"
              }`}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        {image && imageError && (
          <div className="mt-4 flex aspect-[16/9] w-full items-center justify-center rounded-[11px] border border-[var(--line)] bg-[var(--paper)]">
            <div className="flex flex-col items-center gap-2 text-[var(--ink-faint)]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <span className="meta-text">{name}</span>
            </div>
          </div>
        )}

        <p className="body-copy mt-3 flex-1 text-sm">
          {description}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-0.5 flex-none font-mono text-[var(--add)]">+</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="tag-pill"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (!link) {
    return (
      <div
        className={cardClasses}
      >
        {content}
      </div>
    );
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
