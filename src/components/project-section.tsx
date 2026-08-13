import React from "react";
import ProjectCard, { type Specimen } from "./project-card";

interface Project {
  date: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  specimen?: Specimen;
  featured?: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      date: "Oct. 2024 – Jun. 2026",
      name: "Cattlelog",
      description: "Course search and professor insights shaped through two years of product and engineering ownership.",
      techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "PostgreSQL", "Redis", "PostHog"],
      link: "https://daviscattlelog.com",
      specimen: {
        file: "daviscattlelog.com",
        range: "prod",
        rows: [
          { sign: "+", text: "60K+ unique · 9.4K+ monthly active users" },
          { sign: "+", text: "4× search · 90% lower API latency" },
        ],
      },
      featured: true,
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
  ];

  return (
    <section className="page-section">
      <div>
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Selected projects</h2>
          <span className="section-note">hover to stage</span>
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
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                date={project.date}
                name={project.name}
                description={project.description}
                techStack={project.techStack}
                link={project.link}
                specimen={project.specimen}
                featured={project.featured}
                className={project.featured ? "md:col-span-2 lg:col-span-3" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default Projects;
