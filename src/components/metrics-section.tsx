import React from "react";
import AsciiScrambleText from "./ascii-scramble";

interface MetricItem {
  id: string;
  metric: string;
  unit?: string;
  label: string;
  context: string;
  tag: string;
  highlight: string;
  specFile: string;
}

const METRICS: MetricItem[] = [
  {
    id: "intake-volume",
    metric: "500K+",
    unit: "sessions/mo",
    label: "Monthly Clinical Intake Sessions",
    context: "Architected event-driven NLP intake & triage pipelines with Kafka, Redis, and Spring.",
    tag: "kaiser · scale",
    highlight: "99% external call cut via Redis caching",
    specFile: "kafka-triage.log",
  },
  {
    id: "cattlelog-users",
    metric: "60K+",
    unit: "users",
    label: "Undergrad Campus Users",
    context: "Led cross-functional team as founding engineer, scaling to 9.4K+ monthly active users.",
    tag: "aggieworks · impact",
    highlight: "4× faster search & 90% lower API latency",
    specFile: "cattlelog-prod.log",
  },
  {
    id: "latency-opt",
    metric: "95%",
    unit: "reduction",
    label: "API Latency Reduction",
    context: "Re-architected vector search, caching layers, and database query planning for sub-100ms response.",
    tag: "performance · core",
    highlight: "pgvector + FastAPI optimization",
    specFile: "pgvector-cache.log",
  },
  {
    id: "ai-agents",
    metric: "22",
    unit: "agents",
    label: "Specialized AI Agents",
    context: "Orchestrated multi-agent execution pipelines for pharmaceutical formulation workflows via WebSockets.",
    tag: "persist-ai · agents",
    highlight: "37 backend APIs across 27+ microservices",
    specFile: "agent-mesh.log",
  },
  {
    id: "uptime-hardening",
    metric: "99.9%",
    unit: "uptime",
    label: "Platform Reliability & Air-Gap",
    context: "Hardened air-gapped NGINX networking, systemd daemonization, and Ansible automated provisioning.",
    tag: "sealing-tech · air-gap",
    highlight: "Zero-dependency air-gapped deployment",
    specFile: "air-gap-nginx.log",
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section className="page-section metrics-arboretum">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">telemetry://production</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 5 verified metrics</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head mb-8">
          <span className="section-num" aria-hidden="true">
            02
          </span>
          <h2 id="metrics-title" className="section-title">
            <AsciiScrambleText text="Vital Growth & Impact" />
          </h2>
          <span className="section-note">telemetry · production proof</span>
        </div>
      </div>

      <div className="diff-block">
        <div className="diff-gutter">
          <span className="plus">+</span>
          <span className="plus">+</span>
          <span className="tilde">~</span>
        </div>
        <div className="diff-body">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((item, index) => (
              <div
                key={item.id}
                className={`metric-card group interactive-surface ${index === 3 ? "lg:col-span-1" : ""} ${index === 4 ? "lg:col-span-2" : ""}`}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <div className="metric-card__header">
                  <span className="metric-tag font-mono">
                    <span className="text-[var(--growth)] mr-1" aria-hidden="true">├─</span>
                    {item.tag}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--ink-faint)]">
                    @@ {item.specFile} @@
                  </span>
                </div>

                <div className="metric-card__value-wrap">
                  <span className="metric-value font-display font-medium text-[var(--growth)]">
                    {item.metric}
                  </span>
                  {item.unit && (
                    <span className="metric-unit font-mono text-xs text-[var(--ink-faint)]">
                      {item.unit}
                    </span>
                  )}
                </div>

                <h3 className="metric-label font-display text-base font-medium text-[var(--ink)]">
                  <AsciiScrambleText text={item.label} />
                </h3>
                <p className="metric-context text-sm text-[var(--ink-soft)] leading-relaxed">
                  {item.context}
                </p>

                <div className="metric-card__footer flex items-center justify-between">
                  <span className="metric-highlight font-mono text-xs text-[var(--ink-faint)]">
                    <span className="metric-bullet text-[var(--add)] font-bold mr-1" aria-hidden="true">
                      +
                    </span>
                    {item.highlight}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity">
                    [verified]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

