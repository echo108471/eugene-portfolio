"use client";

import React from "react";

interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  location: string;
  description: string[];
  techStack?: string[];
  type: "work" | "education" | "award" | "organization";
}

const timelineData: TimelineItem[] = [
  {
    date: "Jun. 2025 – Dec. 2025",
    title: "Software Engineer Intern",
    organization: "Kaiser Permanente",
    location: "Remote",
    type: "work",
    description: [
      "Built and optimized backend services in Spring and Koa powering a NLP guided pre-visit survey system, scaling to over 500K monthly sessions.",
    ],
    techStack: ["Spring", "Koa", "Node.js", "Java", "Kubernetes", "Redis"],
  },
  {
    date: "Oct. 2024 – Current",
    title: "Software Developer",
    organization: "AggieWorks",
    location: "Davis, CA",
    type: "organization",
    description: [
      "Built and launched Cattlelog, a full-stack course/professor insight tool for UC Davis.",
    ],
    techStack: ["FastAPI", "React", "TailwindCSS", "PostgreSQL", "PostHog", "Redis"],
  },
  {
    date: "Jun. 2024 – Sep. 2024",
    title: "Bioinformatics Research Intern",
    organization: "Seoul National University Medical School",
    location: "Seoul, Korea",
    type: "work",
    description: [
      "Conducted research on cancer clonal model determination using genomic data analysis.",
    ],
    techStack: ["Pandas", "NumPy", "Matplotlib", "MuTect2", "Seaborn"],
  },
  {
    date: "Sep. 2022 – Jun. 2026",
    title: "B.S. Computer Science",
    organization: "University of California, Davis",
    location: "Davis, CA",
    type: "education",
    description: [
    ],
  },
];

const Timeline: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getTargetId = (item: TimelineItem) => {
    if (item.type === 'work' || item.type === 'organization') {
      return `exp-${item.organization.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (item.type === 'education') {
      return `edu-${item.organization.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return item.type; // fallback
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-2">Timeline</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Recent experiences and education</p>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-2 md:left-1/2 transform  md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div
                  className={`ml-6 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div 
                    onClick={() => scrollToSection(getTargetId(item))}
                    className="group bg-white dark:bg-innerbox-dark rounded-xl p-6 border border-gray-200 dark:border-accent-dark shadow-sm hover:shadow-xl transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
                  >
                    {/* Date Badge */}
                    <div className="inline-block mb-3">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200">
                        {item.date}
                      </span>
                    </div>

                    {/* Type Badge */}
                    <div className="mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          item.type === "work"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.type === "education"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : item.type === "organization"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {item.type === "work" ? "💼 Work" : item.type === "education" ? "🎓 Education" : item.type === "organization" ? "🏛️ Organization" : "🏆 Award"}
                      </span>
                    </div>

                    {/* Title and Organization */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-foreground-dark mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-subtext-dark mb-1">
                      {item.organization}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-subtext-dark mb-3">
                      📍 {item.location}
                    </p>

                    {/* Description */}
                    {item.description.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-innertext-dark mb-4">
                        {item.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-purple-500 mt-0.5">▸</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack */}
                    {item.techStack && (
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap gap-1.5">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs font-medium text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 rounded border border-gray-200 dark:from-tinybox-dark dark:to-gray-800 dark:text-foreground-dark dark:border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout on desktop */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
