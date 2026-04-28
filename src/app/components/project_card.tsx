"use client";

import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { cardHover, cardTap } from "./motion";

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
  priority = false,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isSvg = image?.endsWith(".svg");

  const cardClasses = `group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/80 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-950/5 active:scale-[0.99] dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40 ${className}`;

  const content = (
    <>
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {image && !imageError && (
        <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950/40">
          <Image
            src={image}
            alt={`${name} preview`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
              isSvg ? "object-contain p-6" : "object-cover"
            }`}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 opacity-80 transition-opacity duration-200 group-hover:opacity-100 dark:text-indigo-300">
            Open
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>

        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
          {name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-700 dark:text-innertext-dark">
          {description}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700 dark:text-innertext-dark">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5 dark:border-white/10">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-200 group-hover:border-indigo-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-indigo-400/40"
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
      <motion.div
        whileHover={shouldReduceMotion ? undefined : cardHover}
        whileTap={shouldReduceMotion ? undefined : cardTap}
        className={cardClasses}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={shouldReduceMotion ? undefined : cardHover}
      whileTap={shouldReduceMotion ? undefined : cardTap}
      className={cardClasses}
      aria-label={`Open ${name}`}
    >
      {content}
    </motion.a>
  );
};

export default ProjectCard;
