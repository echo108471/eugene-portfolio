import React from "react";
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
    date: "Jun. 2026",
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
      <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] text-sm font-semibold text-[var(--ink-soft)]">
        {edu.institution
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join("")}
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] transition-colors duration-200 group-hover:border-[var(--add-edge)]">
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
        <img
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
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">06</span>
          <h2 className="section-title">Education & background</h2>
          <span className="section-note">history.md</span>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="grid gap-5 lg:grid-cols-2">
            {education.map((edu) => {
              const educationId = `edu-${slugify(edu.institution)}`;

              return (
                <div
                  key={edu.institution}
                  id={educationId}
                  className="surface-card group p-5"
                >
                  <div className="flex gap-4">
                    <EducationLogo edu={edu} />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-medium text-[var(--ink)]">
                        {edu.institution}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[var(--ink-soft)]">
                        {edu.degree}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="tag-pill">
                          <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                          {edu.location}
                        </span>
                        <span className="tag-pill">
                          <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
                          {edu.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[var(--line)] pt-5">
                    {edu.description.map((item) => (
                      <p
                        key={item}
                        className="body-copy flex gap-3 text-sm"
                      >
                        <span className="flex-none font-mono text-[var(--add)]">+</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
