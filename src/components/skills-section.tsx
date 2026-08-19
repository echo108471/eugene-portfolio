import React from "react";
import AsciiScrambleText from "./ascii-scramble";

interface SkillSubsystem {
  id: string;
  name: string;
  category: string;
  badge: string;
  skills: { name: string; tag?: string }[];
  doctrine: string;
}

const subsystems: SkillSubsystem[] = [
  {
    id: "core-languages",
    name: "Core Systems & Languages",
    category: "layer 01 // execution",
    badge: "compiled · concurrent",
    doctrine: "Type-safe concurrency, memory-efficient services, and async I/O pipelines",
    skills: [
      { name: "Python", tag: "FastAPI / vLLM" },
      { name: "Java", tag: "Spring / Kafka" },
      { name: "Go", tag: "Fiber / WebSockets" },
      { name: "TypeScript", tag: "React / Node" },
      { name: "C / C++", tag: "POSIX / Systems" },
      { name: "SQL", tag: "PostgreSQL / pgvector" },
      { name: "PHP", tag: "CGI Pipelines" },
      { name: "JavaScript", tag: "ESNext" },
    ],
  },
  {
    id: "distributed-data",
    name: "Distributed Systems & Data",
    category: "layer 02 // platform",
    badge: "event-driven · storage",
    doctrine: "Time-bucketed cache layers, high-throughput event logs, and vector indexing",
    skills: [
      { name: "PostgreSQL", tag: "Relational Core" },
      { name: "Redis", tag: "Negative Caching" },
      { name: "Apache Kafka", tag: "Event Streams" },
      { name: "pgvector", tag: "Embedding Index" },
      { name: "Docker", tag: "Containerization" },
      { name: "Podman", tag: "Rootless" },
      { name: "Ansible", tag: "Zero-Trust Provisioning" },
      { name: "NGINX", tag: "Hardened Gateway" },
      { name: "systemd", tag: "Daemons" },
    ],
  },
  {
    id: "ai-inference",
    name: "AI & Inference Infrastructure",
    category: "layer 03 // intelligence",
    badge: "air-gapped · multi-agent",
    doctrine: "Multi-agent coordination meshes, context window telemetry, and streaming protocol sync",
    skills: [
      { name: "vLLM", tag: "High-Throughput Inference" },
      { name: "Multi-Agent Mesh", tag: "22 Specialized Agents" },
      { name: "WebSockets", tag: "Bidirectional Sync" },
      { name: "Server-Sent Events", tag: "Live Streaming" },
      { name: "Context Telemetry", tag: "Zepharis AI" },
      { name: "OpenAI API", tag: "Tool Calling" },
    ],
  },
  {
    id: "observability-tools",
    name: "Observability & Toolchains",
    category: "layer 04 // telemetry",
    badge: "metrics · reliability",
    doctrine: "Continuous metric telemetry, distributed error tracing, and automated CI/CD",
    skills: [
      { name: "Prometheus", tag: "Time-Series Metrics" },
      { name: "Grafana", tag: "Dashboard Analytics" },
      { name: "Loki", tag: "Log Aggregation" },
      { name: "Splunk", tag: "Enterprise Audit" },
      { name: "Dynatrace", tag: "APM Tracing" },
      { name: "GitHub Actions", tag: "CI / CD" },
      { name: "Linux / Unix", tag: "Kernel & Shell" },
      { name: "Git", tag: "Version Control" },
    ],
  },
];

const telemetryData = [
  { label: "target.platform", val: "linux / amd64" },
  { label: "concurrency.model", val: "event-driven / async" },
  { label: "storage.engine", val: "pgvector + redis-lru" },
  { label: "inference.runtime", val: "vLLM air-gapped" },
  { label: "event.streaming", val: "kafka consumer groups" },
  { label: "security.posture", val: "zero-trust / systemd" },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="page-section">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">roots://skills.lock</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 4 technical layers</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">05</span>
          <h2 className="section-title">
            <AsciiScrambleText text="The Root Biome" />
          </h2>
          <span className="section-note">roots · skills.lock</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="tilde">~</span>
          <span className="plus">+</span>
          <span className="plus">+</span>
        </div>
        <div className="diff-body">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:items-start">
            {/* Left Column: 4 Technical Subsystems */}
            <div className="space-y-4">
              {subsystems.map((subsystem) => (
                <div
                  key={subsystem.id}
                  className="surface-card interactive-surface p-5 transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[var(--line-faint)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--growth)] font-medium">
                        {subsystem.category}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-faint)]">
                        [{subsystem.badge}]
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--accent)]">
                      lock · resolved
                    </span>
                  </div>

                  <h3 className="font-display text-base font-medium text-[var(--ink)] mb-1">
                    <AsciiScrambleText text={subsystem.name} />
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mb-3.5 leading-relaxed">
                    {subsystem.doctrine}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {subsystem.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="tag-pill group/tag hover:border-[var(--growth)] transition-colors"
                      >
                        <span className="text-[var(--ink)] font-medium">{skill.name}</span>
                        {skill.tag && (
                          <span className="text-[var(--ink-faint)] text-[10px] ml-1 opacity-70 group-hover/tag:opacity-100 font-mono">
                            · {skill.tag}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Runtime Environment Telemetry HUD */}
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="ascii-box-frame p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--line-faint)] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--growth)] font-mono text-xs">╭─[</span>
                    <span className="font-mono text-xs text-[var(--ink)] font-semibold">runtime://environment</span>
                    <span className="text-[var(--growth)] font-mono text-xs">]</span>
                  </div>
                  <span className="font-mono text-[10.5px] text-[var(--growth)]">● active</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {telemetryData.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 text-xs border-b border-[var(--line-faint)] pb-1.5 last:border-b-0"
                    >
                      <span className="text-[var(--ink-faint)] text-[11px]">{item.label}</span>
                      <span className="text-[var(--growth)] font-medium text-[11px] text-right">
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--line-faint)]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--ink-faint)]">
                    <span>package.count: 31 dependencies</span>
                    <span className="text-[var(--growth)]">sha256: 4f8e...9a12</span>
                  </div>
                </div>
              </div>

              {/* Subsystem Philosophy Callout */}
              <div className="surface-card p-4 text-xs font-mono text-[var(--ink-soft)] bg-[var(--paper-glass-subtle)]">
                <p className="flex items-center gap-2 text-[var(--accent)] font-semibold mb-1.5">
                  <span aria-hidden="true">●</span>
                  <span>Zero-Trust Architecture</span>
                </p>
                <p className="text-[11.5px] leading-relaxed text-[var(--ink-soft)]">
                  All platform systems are built for strict resource boundaries, observable telemetry, and automated container lifecycle management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

