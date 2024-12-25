import React from "react";
import "../globals.css";

const experiences = [
  {
    title: "Software Developer",
    company: "AggieWorks",
    location: "Davis, CA",
    date: "Oct. 2024 – Current",
    description: [
      "Contributed to the development of a course recommendation tool by building the backend with FastAPI, utilizing BeautifulSoup4 for web scraping, and applying NLTK Vader for sentiment analysis.",
      "Collaborated with product managers and designers to develop a full-stack application, iterating on existing features while contributing to both backend and frontend development.",
      "Employed both Agile and Waterfall methodologies in a cross-functional team to effectively manage project timelines, adapt to changing requirements, and ensure cohesive communication across development, design, and product management teams.",
    ],
    techStack: ["FastAPI", "BeautifulSoup4", "React", "TailwindCSS"],
  },
  {
    title: "Bioinformatics Research Intern",
    company: "Seoul National University Medical School",
    location: "Seoul, Korea",
    date: "Jun. 2024 – Sep. 2024",
    description: [
      "Researched cancer clonal model determination using monoallelic expression of inactivated genes at the Genomic Medicine Institute at SNU Medical School under Professor Kim Jong Il.",
      "Focused on data analysis and representation of bulk DNA data, using data from MuTect2 and HaplotypeCaller.",
      "Developed Python scripts utilizing Pandas, Seaborn, Sci-kit Learn and other libraries for advanced analyses and visualizations.",
    ],
    techStack: ["Bash","Pandas", "NumPy", "Matplotlib", "MuTect2", "HaplotypeCaller", "Seaborn", "Sci-kit Learn", "Dash"],
  },
  {
    title: "Bioinformatics Intern",
    company: "PNA Bio Inc.",
    location: "Thousand Oaks, CA",
    date: "Sep. 2023 – Jan. 2024",
    description: [
      "Developed the PNA Designer Tool, a Python algorithm for selecting optimal sequences based on various parameters.",
      "Designed the Donor Designer, an algorithm for generating DNA sequences with targeted mutations for CRISPR research.",
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
      "Engineered databases on a Linux server, employing MySQL to organize chemicals and enzymes for advanced drug screening.",
      "Utilized Neo4j to generate visualizations of complex data structures, uncovering trends and connections.",
    ],
    techStack: ["Linux", "MySQL", "Neo4j"],
  },
];

const ExperienceSection = () => {
  return (
    <section className="bg-white-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Experiences</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {experience.company}
              </h3>
              <p className="text-sm text-gray-500">
                {experience.title} • {experience.location}
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                {experience.date}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-600">Tech Stack:</h4>
        <ul className="flex flex-wrap gap-2 mt-2">
          {experience.techStack.map((tech, index) => (
            <li
              key={index}
              className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
