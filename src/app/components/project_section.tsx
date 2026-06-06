import React from "react";
import ProjectCard from "./project_card";
import { Reveal } from "./motion";

interface Project {
  date: string;
  name: string;
  description: string;
  highlights?: string[];
  techStack: string[];
  link: string;
  image: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      date: "Oct. 2024 – Present",
      name: "Cattlelog",
      description: "Full-stack course and professor insights platform for UC Davis students.",
      highlights: [
        "Reached 40K+ unique users with faster search, caching, and rendering paths.",
      ],
      techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "PostgreSQL", "Redis", "PostHog"],
      link: "https://daviscattlelog.com",
      image: "/projects/cattlelog.svg"
    },
    {
      date: "Nov. 2025",
      name: "CollabRoomAI",
      description: "Real-time collaborative chat application with integrated AI agents.",
      highlights: [
        "Built a Go/Fiber and SvelteKit app with WebSocket messaging and AI agents for live analysis and summarization.",
        "Designed reusable chat and agent flows with Svelte 5, TypeScript, and Tailwind.",
      ],
      techStack: ["SvelteKit", "TypeScript", "TailwindCSS", "Go", "Fiber", "WebSockets", "OpenAI API"],
      link: "https://github.com/echo108471/CollabRoomAI",
      image: "/projects/collabroomai.png"
    },
    {
      date: "Jan. 2025",
      name: "PNA Designer Tool",
      description: "Bioinformatics web tool for CRISPR/Cas9 donor design workflows.",
      techStack: ["PHP", "HTML/CSS", "Python", "CGI Scripts", "Input Validation"],
      link: "https://pnabio.com/pna-designer/",
      image: "/projects/pna-designer.png"
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "Decentralized file storage system using IPFS and ResilientDB.",
      techStack: ["React", "TypeScript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
      image: "/projects/resilient-files.png"
    },
    {
      date: "Dec. 2024",
      name: "Monkey Trench Offense",
      description: "Reverse tower defense game built in Godot Engine.",
      techStack: ["Godot Engine", "GDScript"],
      link: "https://github.com/echo108471/MonkeyTrenchOffense",
      image: "/projects/monkey-trench-offense.png"
    },
    {
      date: "Sep. 2024",
      name: "HangulStudy",
      description: "Interactive Korean language learning platform for level-based vocabulary practice.",
      highlights: [
        "Built practice sets, a virtual Hangul keyboard, scoring, and RESTful difficulty-tier APIs.",
      ],
      techStack: ["React", "TailwindCSS", "Hangul", "SQLite3", "Express.js"],
      link: "https://koreanquiz.onrender.com/",
      image: "/projects/korean-quiz.png"
    },
    {
      date: "Sep. 2024",
      name: "PNA Tool",
      description: "Bioinformatics web tool for PNA oligo sequence analysis and design workflows.",
      techStack: ["PHP", "HTML/CSS", "Python", "CGI Scripts", "Input Validation"],
      link: "https://pnabio.com/pna-tool/",
      image: "/projects/pna-tool.png"
    },
  ];

  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Selected projects</h2>
          <span className="section-note">hover to stage</span>
        </div>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="body-copy max-w-2xl">
            Selected builds across education, collaboration, bioinformatics, storage, and games.
          </p>
          <div className="tag-pill add">
            {projects.length} featured builds
          </div>
        </div>
      </Reveal>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                date={project.date}
                name={project.name}
                description={project.description}
                highlights={project.highlights}
                techStack={project.techStack}
                link={project.link}
                image={project.image}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default Projects;
