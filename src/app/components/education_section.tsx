import React from "react";

const education = [
  {
    degree: "B.S. Computer Science",
    institution: "University of California, Davis",
    location: "Davis, CA",
    date: "Sep. 2022 – Jun. 2026 (Expected)",
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground-dark">
                {edu.institution}
              </h3>
              <p className="text-sm text-gray-500 dark:text-subtext-dark">
                {edu.degree} • {edu.location}
              </p>
              <p className="text-sm text-gray-500 italic mb-4 dark:text-subtext-dark">
                {edu.date}
              </p>
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
