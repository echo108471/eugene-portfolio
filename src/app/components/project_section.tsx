import React from "react";
import ProjectCard from "./project_card";

const Projects: React.FC = () => {
  const projects = [
    {
      date: "Oct. 2024 - Current",
      name: "Cattlelog",
      description: "Course Recommendation Tool built for UC Davis Students",
      techStack: ["React","Typescript","TailwindCSS", "FastAPI", "PostgreSQL", "Redis", "Neptune"],
      link: "https://daviscattlelog.com",
      image: "/projects/cattlelog.svg"
    },
    {
      date: "Jan. 2025",
      name: "PNA Designer Tool",
      description: "Web tool for selecting optimal PNA oligos based on various parameters",
      techStack: ["PHP", "HTML", "CSS", "Python", "JSON"],
      link: "https://pnabio.com/pna-designer/",
      image: "/projects/pna-designer.png"
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "Decentralized file storage system using IPFS and ResilientDB",
      techStack: ["React","Typescript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
      image: "/projects/resilient-files.png"
    },
    {
      date: "Dec. 2024",
      name: "Monkey Trench Offense",
      description: "Reverse tower defense game built in Godot Engine",
      techStack: ["Godot Engine", "GDScript"],
      link: "https://github.com/Echo108471/MonkeyTrenchOffense",
      image: "/projects/monkey-trench-offense.png"
    },
    {
      date: "Sep. 2024",
      name: "Korean Quiz",
      description: "Full-stack Korean vocabulary learning platform",
      techStack: ["React", "Javascript", "Tailwind", "Express", "SQLite3"],
      link: "https://koreanquiz.onrender.com/",
      image: "/projects/korean-quiz.png"
    },
    {
      date: "Sep. 2024",
      name: "PNA Tool",
      description: "Web tool designed to give information about PNA oligos for optimal design",
      techStack: ["PHP", "HTML", "CSS", "Python", "JSON"],
      link: "https://pnabio.com/pna-tool/",
      image: "/projects/pna-tool.png"
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
            image={project.image}
          />
        ))}
      </div>
    </div>
  </section>
);
}



export default Projects;
