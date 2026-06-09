import React from "react";
import ProjectCard, { type Specimen } from "./project_card";

interface Project {
  date: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  specimen?: Specimen;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      date: "Oct. 2024 – Present",
      name: "Cattlelog",
      description: "Course search and professor insights for UC Davis students.",
      techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "PostgreSQL", "Redis", "PostHog"],
      link: "https://daviscattlelog.com",
      specimen: {
        file: "daviscattlelog.com",
        range: "prod",
        rows: [
          { sign: "+", text: "40K+ unique users" },
          { sign: "+", text: "faster search · caching · rendering" },
        ],
      },
    },
    {
      date: "Nov. 2025",
      name: "CollabRoomAI",
      description: "Collaborative chat room where AI agents summarize and analyze live messages.",
      techStack: ["SvelteKit", "TypeScript", "TailwindCSS", "Go", "Fiber", "WebSockets", "OpenAI API"],
      link: "https://github.com/echo108471/CollabRoomAI",
      specimen: {
        file: "CollabRoomAI",
        range: "main",
        rows: [
          { sign: "+", text: "real-time WebSocket messaging" },
          { sign: "+", text: "AI agents for live analysis + summaries" },
        ],
      },
    },
    {
      date: "Jan. 2025",
      name: "PNA Designer Tool",
      description: "CRISPR/Cas9 donor-design tool with sequence validation and CGI processing.",
      techStack: ["PHP", "HTML/CSS", "Python", "CGI Scripts", "Input Validation"],
      link: "https://pnabio.com/pna-designer/",
      specimen: {
        file: "pnabio.com/pna-designer",
        range: "prod",
        rows: [
          { sign: "+", text: "CRISPR/Cas9 donor design" },
          { sign: "+", text: "validated sequence input · CGI pipeline" },
        ],
      },
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "File ledger and storage prototype using IPFS with ResilientDB.",
      techStack: ["React", "TypeScript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
      specimen: {
        file: "decentralized-sys",
        range: "main",
        rows: [
          { sign: "+", text: "decentralized file storage on IPFS" },
          { sign: "+", text: "file ledger backed by ResilientDB" },
        ],
      },
    },
    {
      date: "Dec. 2024",
      name: "Monkey Trench Offense",
      description: "Reverse tower defense game with custom abilities and two playable levels.",
      techStack: ["Godot Engine", "GDScript"],
      link: "https://github.com/echo108471/MonkeyTrenchOffense",
      specimen: {
        file: "MonkeyTrenchOffense",
        range: "main",
        rows: [
          { sign: "+", text: "reverse tower-defense mechanics" },
          { sign: "+", text: "custom power abilities · 2+ levels" },
        ],
      },
    },
    {
      date: "Sep. 2024",
      name: "HangulStudy",
      description: "Korean vocabulary practice with a virtual Hangul keyboard and level-based quizzes.",
      techStack: ["React", "TailwindCSS", "Hangul", "SQLite3", "Express.js"],
      link: "https://koreanquiz.onrender.com/",
      specimen: {
        file: "koreanquiz.onrender.com",
        range: "prod",
        rows: [
          { sign: "+", text: "virtual Hangul keyboard · scoring" },
          { sign: "+", text: "level-based sets · tiered REST APIs" },
        ],
      },
    },
    {
      date: "Sep. 2024",
      name: "PNA Tool",
      description: "PNA sequence analysis tool with validation for oligo design.",
      techStack: ["PHP", "HTML/CSS", "Python", "CGI Scripts", "Input Validation"],
      link: "https://pnabio.com/pna-tool/",
      specimen: {
        file: "pnabio.com/pna-tool",
        range: "prod",
        rows: [
          { sign: "+", text: "PNA oligo sequence analysis" },
          { sign: "+", text: "oligo design · input validation" },
        ],
      },
    },
  ];

  return (
    <section className="page-section">
      <div>
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Selected projects</h2>
          <span className="section-note">hover to stage</span>
        </div>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="body-copy max-w-2xl">
            A few shipped things: campus search, AI collaboration, bioinformatics tools, decentralized storage, and a game.
          </p>
          <div className="tag-pill add">
            {projects.length} linked projects
          </div>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                date={project.date}
                name={project.name}
                description={project.description}
                techStack={project.techStack}
                link={project.link}
                specimen={project.specimen}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default Projects;
