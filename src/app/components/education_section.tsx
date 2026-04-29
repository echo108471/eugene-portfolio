import React from "react";
import Image from "next/image";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  date: string;
  description: string[];
  logo?: string;
  logoLight?: string;
  logoDark?: string;
}

const education: EducationItem[] = [
  {
    degree: "B.S. Computer Science",
    institution: "University of California, Davis",
    location: "Davis, CA",
    date: "Expected Jun. 2026",
    logoLight: "/education/ucd_logo_light.png",
    logoDark: "/education/ucd_logo_dark.png",
    description: ["B.S. in Computer Science"],
  },
  {
    degree: "High School Diploma",
    institution: "Newbury Park High School",
    location: "Thousand Oaks, CA",
    date: "Aug. 2018 – May. 2022",
    description: [
      "President of Code Nation, President of Recycling Club",
    ],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function EducationLogo({ edu }: { edu: EducationItem }) {
  if (!edu.logo && !edu.logoLight && !edu.logoDark) {
    return (
      <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        {edu.institution
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join("")}
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition-colors duration-200 group-hover:border-indigo-200 group-hover:bg-white dark:border-white/10 dark:bg-white/5 dark:group-hover:border-indigo-400/40">
      {(edu.logoLight || edu.logoDark) && (
        <div
          className="theme-logo h-11 w-11"
          style={
            {
              "--logo-light": `url(${edu.logoLight})`,
              "--logo-dark": `url(${edu.logoDark})`,
            } as React.CSSProperties
          }
          role="img"
          aria-label={`${edu.institution} logo`}
        />
      )}

      {edu.logo && !edu.logoLight && !edu.logoDark && (
        <Image
          src={edu.logo}
          alt={`${edu.institution} logo`}
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      )}
    </div>
  );
}

const EducationSection = () => {
  return (
    <section className="py-12 sm:py-14">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
            Education
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
            Education & background.
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {education.map((edu) => {
          const educationId = `edu-${slugify(edu.institution)}`;

          return (
            <div
              key={edu.institution}
              id={educationId}
              className="group rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-indigo-200 hover:shadow-md active:scale-[0.99] dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/60 dark:hover:bg-white/[0.08]"
            >
              <div className="flex gap-4">
                <EducationLogo edu={edu} />

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {edu.degree}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">
                      <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                      {edu.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">
                      <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
                      {edu.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5 dark:border-white/10">
                {edu.description.map((item) => (
                  <p
                    key={item}
                    className="text-sm leading-6 text-slate-700 dark:text-innertext-dark"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EducationSection;
