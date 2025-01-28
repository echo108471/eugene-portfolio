import React from "react";
import ProjectCard from "./project_card";

const Projects: React.FC = () => {
  const projects = [
    {
      date: "Oct. 2024 - Current",
      name: "Cattlelog",
      description: "Course Recommendation Tool built for UC Davis Students",
      techStack: ["React","Typescript","TailwindCSS", "FastAPI", "PostgreSQL", "Docker", ],
      link: "https://daviscattlelog.com"
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "Decentralized file storage system using IPFS and ResilientDB, final project for ECS 189F.",
      techStack: ["React","Typescript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
    },
    {
      date: "Dec. 2024",
      name: "Monkey Trench Offense",
      description: "Reverse tower defense game built in Godot Engine, final project for ECS 179.",
      techStack: ["Godot Engine", "GDScript"],
      link: "https://github.com/Echo108471/MonkeyTrenchOffense",
    },
    {
      date: "Sep. 2024",
      name: "Korean Quiz",
      description: "Simple Korean quiz app built with React and Javascript, with a database and sqlite3 in the backend.",
      techStack: ["React", "Javascript", "Express", "sqlite3"],
      link: "https://github.com/Echo108471/KoreanQuiz",
    },
    {
      date: "Dec. 2023",
      name: "Donor Designer Tool",
      description: "Python algorithm for generating DNA sequences with targeted mutations for CRISPR research.",
      techStack: ["PHP", "Python", "JSON"],
      link: "https://github.com/Echo108471/Donor-Designer",
    },
    {
      date: "Sep. 2023",
      name: "PNA Designer Tool",
      description: "Python algorithm for selecting optimal sequences based on various parameters.",
      techStack: ["PHP", "Python", "JSON"],
      link: "https://github.com/Echo108471/PNA-Tool",
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
