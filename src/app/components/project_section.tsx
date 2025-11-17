import React from "react";
import ProjectCard from "./project_card";

const Projects: React.FC = () => {
  const projects = [
    {
      date: "Oct. 2024 - Current",
      name: "Cattlelog",
      description: "Course Recommendation Tool built for UC Davis Students",
      techStack: ["React","Typescript","TailwindCSS", "FastAPI", "PostgreSQL", "Redis", "Neptune"],
      link: "https://daviscattlelog.com"
    },
    {
      date: "Jan. 2025",
      name: "Donor Designer Tool",
      description: "Python algorithm for generating DNA sequences with targeted mutations for CRISPR research",
      techStack: ["PHP", "HTML", "CSS", "Python", "JSON"],
      link: "https://pnabio.com/pna-designer/",
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "Decentralized file storage system using IPFS and ResilientDB",
      techStack: ["React","Typescript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
    },
    {
      date: "Dec. 2024",
      name: "Monkey Trench Offense",
      description: "Reverse tower defense game built in Godot Engine",
      techStack: ["Godot Engine", "GDScript"],
      link: "https://github.com/Echo108471/MonkeyTrenchOffense",
    },
    {
      date: "Sep. 2024",
      name: "Korean Quiz",
      description: "Simple application to test Korean vocabulary and spelling",
      techStack: ["React", "Javascript", "Express", "SQLite3"],
      link: "https://github.com/Echo108471/KoreanQuiz",
    },
    {
      date: "Sep. 2024",
      name: "PNA Designer Tool",
      description: "Python algorithm for selecting optimal sequences based on various parameters",
      techStack: ["PHP", "HTML", "CSS", "Python", "JSON"],
      link: "https://pnabio.com/pna-tool/",
    },
  ];

return (
  <section className="bg-white-100 py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            date={project.date}
            name={project.name}
            description={project.description}
            techStack={project.techStack}
            link={project.link}
          />
        ))}
      </div>
    </div>
  </section>
);
}



export default Projects;
