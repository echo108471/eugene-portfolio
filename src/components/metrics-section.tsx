import React from "react";

interface MetricItem {
  id: string;
  metric: string;
  unit?: string;
  label: string;
  context: string;
  tag: string;
  highlight: string;
}

const METRICS: MetricItem[] = [
  {
    id: "intake-volume",
    metric: "500K+",
    label: "Monthly Clinical Sessions",
    context: "Architected event-driven NLP intake & triage pipelines with Kafka, Redis, and Spring.",
    tag: "kaiser · scale",
    highlight: "99% external call cut via Redis caching",
  },
  {
    id: "cattlelog-users",
    metric: "60K+",
    unit: "users",
    label: "Undergrad Campus Users",
    context: "Led cross-functional team as founding engineer, scaling to 9.4K+ monthly active users.",
    tag: "aggieworks · impact",
    highlight: "4× faster search & 90% lower API latency",
  },
  {
    id: "latency-opt",
    metric: "95%",
    label: "Latency Reduction",
    context: "Re-architected vector search, caching layers, and database query planning for sub-100ms response.",
    tag: "performance · core",
    highlight: "pgvector + FastAPI optimization",
  },
  {
    id: "ai-agents",
    metric: "22",
    unit: "agents",
    label: "Specialized AI Agents",
    context: "Orchestrated multi-agent execution pipelines for pharmaceutical formulation workflows via WebSockets.",
    tag: "persist-ai · agents",
    highlight: "37 backend APIs across 27+ microservices",
  },
  {
    id: "uptime-hardening",
    metric: "99.9%",
    label: "Platform Reliability",
    context: "Hardened air-gapped NGINX networking, systemd daemonization, and Ansible automated provisioning.",
    tag: "sealing-tech · air-gap",
    highlight: "Zero-dependency air-gapped deployment",
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <div
      className="section-wrap metrics-arboretum"
      aria-labelledby="metrics-title"
    >
      <div className="section-head mb-8">
        <span className="section-num" aria-hidden="true">
          01
        </span>
        <h2 id="metrics-title" className="section-title">
          Vital Growth &amp; Impact
        </h2>
        <span className="section-note">telemetry · production proof</span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((item, index) => (
          <div
            key={item.id}
            className={`metric-card ${index === 3 ? "lg:col-span-1" : ""} ${index === 4 ? "lg:col-span-2" : ""}`}
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <div className="metric-card__header">
              <span className="metric-tag">{item.tag}</span>
              <span className="metric-ring-indicator" aria-hidden="true" />
            </div>

            <div className="metric-card__value-wrap">
              <span className="metric-value">{item.metric}</span>
              {item.unit && <span className="metric-unit">{item.unit}</span>}
            </div>

            <h3 className="metric-label">{item.label}</h3>
            <p className="metric-context">{item.context}</p>

            <div className="metric-card__footer">
              <span className="metric-highlight">
                <span className="metric-bullet" aria-hidden="true">
                  +
                </span>
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsSection;
