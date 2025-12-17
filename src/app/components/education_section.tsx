import React from "react";
import Image from "next/image";

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
    date: "Sep. 2022 – Jun. 2026 (Expected)",
    logo: "/education/ucd.svg",
    description: [
      "Relevant coursework: ECS 36C Data Structures and Algorithms, ECS 122A Algorithm Design and Analysis, ECS 124 Bioinformatics, ECS 140A Programming Languages, ECS 150 Operating Systems, ECS 154A Computer Architecture, ECS 171 Machine Learning, ECS 189 Databases",
    ],
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

const EducationSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto dark:text-foreground-dark px-4">
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => {
            const educationId = `edu-${edu.institution.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <div
                key={index}
                id={educationId}
                className="bg-white rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark"
              >
                <div className="flex items-start gap-4 mb-4">
                  {(edu.logo || edu.logoLight || edu.logoDark) && (
                    <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-gray-50 dark:bg-tinybox-dark rounded-lg border border-gray-200 dark:border-accent-dark">
                      {(edu.logoLight || edu.logoDark) && (
                        <div
                          className="theme-logo w-14 h-14"
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
                        <div className="relative h-14 w-14">
                          <Image
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            width={56}
                            height={56}
                            priority
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground-dark">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-subtext-dark">
                      {edu.degree} • {edu.location}
                    </p>
                    <p className="text-sm text-gray-500 italic dark:text-subtext-dark">
                      {edu.date}
                    </p>
                  </div>
                </div>

                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-innertext-dark">
                  {edu.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
