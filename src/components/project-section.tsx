import React from "react";
import ProjectCard, { type Specimen } from "./project-card";
import AsciiScrambleText from "./ascii-scramble";

interface Project {
  date: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  specimen?: Specimen;
  featured?: boolean;
  badge?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      date: "Oct. 2024 – Jun. 2026",
      name: "Cattlelog",
      description: "Course search, degree planning, and professor analytics shaped through two years of product and engineering ownership at AggieWorks.",
      techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "PostgreSQL", "pgvector", "Redis", "PostHog"],
      link: "https://daviscattlelog.com",
      badge: "prod live · 60K+ users",
      specimen: {
        file: "daviscattlelog.com",
        range: "prod · v2.4",
        rows: [
          { sign: "+", text: "60K+ unique users · 9.4K+ monthly active users" },
          { sign: "+", text: "4× faster search retrieval & 90% lower API latency" },
          { sign: "+", text: "pgvector hybrid embedding + full-text PostgreSQL indexing" },
        ],
        archRows: [
          { sign: "~", text: "arch: React SPA ──> Cloudflare Edge ──> FastAPI Service" },
          { sign: "~", text: "caching: Tiered Redis LRU with course catalog prewarming" },
          { sign: "+", text: "observability: Prometheus + Grafana + Loki error tracing" },
        ],
        telemetryRows: [
          { sign: "+", text: "p95.latency: 78ms across 20,000+ course sections" },
          { sign: "+", text: "peak.concurrency: 1.2K concurrent users during registration" },
          { sign: "+", text: "cache.hit_rate: 94.2% on professor review queries" },
        ],
      },
      featured: true,
    },
    {
      date: "Nov. 2025",
      name: "CollabRoomAI",
      description: "Collaborative chat room where autonomous AI agents analyze live messages, stream summaries, and answer technical questions in real time.",
      techStack: ["SvelteKit", "TypeScript", "TailwindCSS", "Go", "Fiber", "WebSockets", "OpenAI API"],
      link: "https://github.com/echo108471/CollabRoomAI",
      badge: "open source · Go Hub",
      specimen: {
        file: "CollabRoomAI",
        range: "main · Fiber",
        rows: [
          { sign: "+", text: "real-time bidirectional WebSocket room multiplexing" },
          { sign: "+", text: "autonomous background AI summarizer & thread analysis" },
          { sign: "+", text: "sub-15ms message broadcast via Go Fiber channel fanout" },
        ],
        archRows: [
          { sign: "~", text: "arch: SvelteKit client <──WebSocket──> Go Fiber Hub" },
          { sign: "~", text: "worker: Goroutine worker pool with token rate limiting" },
        ],
        telemetryRows: [
          { sign: "+", text: "broadcast.latency: <12ms message fanout" },
          { sign: "+", text: "memory.footprint: <28MB resident RAM" },
        ],
      },
    },
    {
      date: "Jan. 2025",
      name: "PNA Designer Tool",
      description: "CRISPR/Cas9 donor-design tool with rigorous FASTA sequence validation and automated CGI bio-processing pipeline for research labs.",
      techStack: ["PHP", "HTML/CSS", "Python", "CGI Scripts", "Input Validation"],
      link: "https://pnabio.com/pna-designer/",
      badge: "prod · PNA Bio",
      specimen: {
        file: "pnabio.com/pna-designer",
        range: "prod · CGI",
        rows: [
          { sign: "+", text: "CRISPR/Cas9 donor design automated pipeline" },
          { sign: "+", text: "strict IUPAC sequence validation & off-target filter" },
          { sign: "+", text: "90% reduction in manual research sequence time" },
        ],
        archRows: [
          { sign: "~", text: "arch: Web form ──> CGI gateway ──> Python FASTA parser" },
          { sign: "~", text: "validation: Strict IUPAC nucleotide matrix verification" },
        ],
        telemetryRows: [
          { sign: "+", text: "throughput: 1.5K+ monthly researcher analyses" },
          { sign: "+", text: "error.rate: 0% invalid FASTA passed to lab" },
        ],
      },
    },
    {
      date: "Dec. 2024",
      name: "Resilient Files",
      description: "Decentralized file ledger and verifiable storage prototype combining IPFS content addressing with ResilientDB Byzantine Fault Tolerant consensus.",
      techStack: ["React", "TypeScript", "IPFS", "ResilientDB", "Python", "FastAPI"],
      link: "https://github.com/ResilientApp/decentralized-sys",
      badge: "research · PBFT",
      specimen: {
        file: "decentralized-sys",
        range: "main · ResilientDB",
        rows: [
          { sign: "+", text: "content-addressed cryptographic chunking on IPFS" },
          { sign: "+", text: "Byzantine Fault Tolerant immutable ledger with ResilientDB" },
          { sign: "+", text: "verifiable SHA-256 chunk hash provenance proof" },
        ],
        archRows: [
          { sign: "~", text: "arch: Client ──> FastAPI Gateway ──> IPFS + ResilientDB" },
          { sign: "~", text: "consensus: Proof-of-Execution Byzantine fault tolerance" },
        ],
        telemetryRows: [
          { sign: "+", text: "block.finality: <850ms on local test cluster" },
          { sign: "+", text: "verifiability: 100% cryptographic ledger auditability" },
        ],
      },
    },
  ];

  return (
    <section className="page-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">refs/selected // systems</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 4 staged builds</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Selected projects" />
          </h2>
          <span className="section-note">hover to stage · interactive specs</span>
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
                badge={project.badge}
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

