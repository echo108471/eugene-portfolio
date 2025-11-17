import React from "react";
import "../globals.css";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Kaiser Permanente",
    location: "Remote",
    date: "Jun. 2025 – Dec. 2025",
    link: "https://www.kaiserpermanente.com/",
    description: [
      "Built and optimized backend services in Spring and Koa powering a NLP guided pre-visit survey system, scaling to over 500K monthly sessions.",
      "Led implementation of a School Note decisioning feature, introducing SOAP-based scaffold integration and employing a config-driven release agent pattern for scalability and maintainability.",
      "Diagnosed and resolved a redis cache miss pattern in evisit retrieval, reducing external API calls by 99%.",
    ],
    techStack: ["Spring", "Koa", "Node.js", "Java", "Kubernetes", "Redis", "XML", "SOAP", "Splunk", "Jenkins"],
  },
  {
    title: "Software Developer",
    company: "AggieWorks",
    location: "Davis, CA",
    date: "Oct. 2024 – Current",
    link: "https://aggieworks.org/",
    description: [
      "Built and launched Cattlelog, a full-stack course/professor insight tool for UC Davis, built with React, FastAPI, and PostgreSQL.",
      "Collaborated with a team of 10 with engineers, product managers, marketers, and designers in a cross-functional team.",
      "Employed both Agile and Waterfall methodologies in a cross-functional team to effectively manage project timelines, adapt to changing requirements, and ensure communication across development, design, and product management teams.",
      "Implemented advanced caching strategies reducing load times by 90% (from 20s to 2s) and decreasing API calls by 99.9%.",
      "Integrated PostHog analytics to monitor user behavior, providing actionable insights that led to a 15% increase in feature engagement and improved user retention.",
    ],
    techStack: ["FastAPI", "React", "TailwindCSS", "PostgeSQL", "PostHog", "Redis", "Neptune"],
  },
  {
    title: "Bioinformatics Research Intern",
    company: "Seoul National University Medical School",
    location: "Seoul, Korea",
    date: "Jun. 2024 – Sep. 2024",
    link: "https://snumrc.snu.ac.kr/gmi/en",
    description: [
      "Conducted research on cancer clonal model determination using monoallelic expression of inactivated genes at the Genomic Medicine Institute, Seoul National University Medical School, under Professor Kim Jong Il.",
      "Analyzed and visualized large-scale genomic data (>10 million entries) using outputs from MuTect2 and HaplotypeCaller, focusing on mutation detection and clonal evolution.",
      "Utilized Python libraries such as Pandas, Seaborn, and scikit-learn to perform complex data analyses, statistical modeling, and advanced visualizations.",
      "Developed robust Python scripts to automate genomic data processing, enabling efficient analysis and visualization of multi-million-line datasets."
    ],
    techStack: ["Pandas", "NumPy", "Matplotlib", "MuTect2", "HaplotypeCaller", "Seaborn", "Scikit-learn", "Dash"],
  },
  {
    title: "Software Engineer Intern",
    company: "PNA Bio Inc.",
    location: "Thousand Oaks, CA",
    date: "Sep. 2023 – Jan. 2024",
    link: "https://www.pnabio.com/",
    description: [
      "Developed the PNA Designer Tool, a Python algorithm that selects optimal sequences based on parameters like length, melting temperature, purine content, and self-complementarity.",
      "Designed the Donor Designer, an algorithm designed to generate customized DNA sequences with targeted mutations that create restriction enzyme sites, optimized specifically for donor design in CRISPR/Cas9 research applications.",
    ],
    techStack: ["Python", "JSON", "PHP", "HTML", "CSS"],
  },
  {
    title: "Software Engineer Intern",
    company: "ASTRO Tech",
    location: "Remote",
    date: "Jun. 2023 – Sep. 2023",
    description: [
      "Spearheaded the development of an Android application enabling seamless control of LED light switches through timed operations.",
      "Leveraged techniques in Android Studio to craft a solution utilizing Kotlin and implementing dynamic scene management.",
    ],
    techStack: ["Kotlin", "Android Studio"],
  },
  {
    title: "Chemoinformatics Intern",
    company: "CIMPLRX",
    location: "Seoul, Korea",
    date: "Jun. 2022 – Sep. 2022",
    description: [
      "Engineered databases on a Linux server with MySQL to categorize compounds crucial for advanced drug screening processes.",
      "Utilized Neo4j to generate visualizations of complex data structures, uncovering trends and connections.",
    ],
    techStack: ["Linux", "MySQL", "Neo4j"],
  },
];

const ExperienceSection = () => {
  return (
    <section className="bg-white-100 dark:bg-background-dark py-10">
      <div className="container mx-auto dark:text-foreground-dark px-4">
        <h2 className="text-2xl font-semibold mb-6">Experiences</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <a
              key={index}
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-transform transform hover:shadow-lg hover:bg-gray-100 dark:hover:bg-accent-dark dark:bg-innerbox-dark dark:border-accent-dark"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground-dark">
                {experience.company}
              </h3>
              <p className="text-sm text-gray-500 dark:text-subtext-dark">
                {experience.title} • {experience.location}
              </p>
              <p className="text-sm text-gray-500 italic mb-4 dark:text-subtext-dark">
                {experience.date}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-innertext-dark">
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-techstack-dark">Tech Stack:</h4>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {experience.techStack.map((tech, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded dark:bg-tinybox-dark dark:text-foreground-dark"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
