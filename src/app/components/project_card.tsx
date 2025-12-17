"use client";

import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  date: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ date, name, description, techStack, link, image }) => {
  const [imageError, setImageError] = React.useState(false);
  const baseClasses = "relative block bg-white rounded-xl overflow-hidden border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark";
  const hoverClasses = link ? "group transition-all duration-200 hover:shadow-2xl hover:border-gray-400 dark:hover:border-gray-500" : "";
  
  const content = (
    <>
      {image && !imageError && (
        <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-tinybox-dark">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-subtext-dark tracking-wider uppercase">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-foreground-dark mb-3 tracking-tight">{name}</h3>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-innertext-dark">{description}</p>
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-techstack-dark uppercase tracking-wider mb-3">Tech Stack</h4>
          <ul className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <li
                key={index}
                className="px-3 py-1.5 text-xs font-medium text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md border border-gray-200 dark:bg-gradient-to-br dark:from-tinybox-dark dark:to-gray-800 dark:text-foreground-dark dark:border-gray-700 transition-all hover:scale-105"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverClasses}`}
    >
      {content}
    </a>
  ) : (
    <div className={baseClasses}>
      {content}
    </div>
  );
};

export default ProjectCard;
