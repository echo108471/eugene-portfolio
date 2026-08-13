import React, { useEffect, useState } from "react";

interface Branch {
  id: "platform" | "ai" | "product";
  label: string;
  detail: string;
  evidenceLabel: string;
  evidenceHref: string;
  desktopPath: string;
  mobilePath: string;
}

const branches: Branch[] = [
  {
    id: "platform",
    label: "backend / platform",
    detail: "Routing, event-driven services, deployment, and observability.",
    evidenceLabel: "view platform work",
    evidenceHref: "#experience",
    desktopPath: "M34 160 H170 C218 160 214 64 300 64 H370 C418 64 414 160 492 160",
    mobilePath: "M34 26 V70 H102",
  },
  {
    id: "ai",
    label: "applied AI",
    detail: "Local models and agent systems under real operational constraints.",
    evidenceLabel: "view applied-AI work",
    evidenceHref: "#experience",
    desktopPath: "M34 160 H492",
    mobilePath: "M34 26 V148 H102",
  },
  {
    id: "product",
    label: "product ownership",
    detail: "Scope, ship, measure, and maintain the work through production.",
    evidenceLabel: "view product evidence",
    evidenceHref: "#projects",
    desktopPath: "M34 160 H170 C218 160 214 256 300 256 H370 C418 256 414 160 492 160",
    mobilePath: "M34 26 V226 H102",
  },
];

const branchPositions = {
  platform: { desktop: "20%", mobile: "22.5%" },
  ai: { desktop: "50%", mobile: "47.5%" },
  product: { desktop: "80%", mobile: "72.5%" },
};

const nodeLayoutClasses = {
  desktop: "branch-graph__node--desktop",
  mobile: "branch-graph__node--mobile",
};

const BranchGraph: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeBranch = branches[activeIndex];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % branches.length);
    }, 7200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, paused]);

  const selectBranch = (index: number) => {
    setActiveIndex(index);
  };

  const branchButtons = (layout: "desktop" | "mobile") =>
    branches.map((branch, index) => (
      <button
        key={branch.id}
        type="button"
        className={`branch-graph__node ${nodeLayoutClasses[layout]} ${
          branch.id === activeBranch.id ? "is-active" : ""
        }`}
        style={{ "--branch-position": branchPositions[branch.id][layout] } as React.CSSProperties}
        aria-pressed={branch.id === activeBranch.id}
        aria-describedby="branch-graph-detail"
        onClick={() => selectBranch(index)}
        onMouseEnter={() => selectBranch(index)}
        onFocus={() => selectBranch(index)}
      >
        <span className="branch-graph__node-dot" aria-hidden="true" />
        <span>{branch.label}</span>
      </button>
    ));

  return (
    <aside
      className="hero-graph"
      aria-label="How Eugene's work converges in production"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="branch-graph__meta">
        <span>career.graph</span>
        <span>HEAD → production</span>
      </div>

      <div className="branch-graph__canvas branch-graph__canvas--desktop">
        <svg viewBox="0 0 526 320" aria-hidden="true">
          {branches.map((branch) => (
            <path
              key={branch.id}
              className="branch-graph__route"
              d={branch.desktopPath}
              pathLength="1"
            />
          ))}
          <path
            key={`active-${activeBranch.id}`}
            className="branch-graph__route branch-graph__route--active"
            d={activeBranch.desktopPath}
            pathLength="1"
          />
          <path
            key={`packet-${activeBranch.id}`}
            className="branch-graph__packet"
            d={activeBranch.desktopPath}
            pathLength="100"
          />
          <circle className="branch-graph__endpoint" cx="34" cy="160" r="4" />
          <circle className="branch-graph__endpoint branch-graph__endpoint--production" cx="492" cy="160" r="5" />
        </svg>
        <span className="branch-graph__terminal branch-graph__terminal--main">main</span>
        <span className="branch-graph__terminal branch-graph__terminal--production">production</span>
        {branchButtons("desktop")}
      </div>

      <div className="branch-graph__canvas branch-graph__canvas--mobile">
        <svg viewBox="0 0 360 312" aria-hidden="true">
          <path className="branch-graph__spine" d="M34 26 V286" pathLength="1" />
          {branches.map((branch) => (
            <path
              key={branch.id}
              className="branch-graph__route"
              d={branch.mobilePath}
              pathLength="1"
            />
          ))}
          <path
            key={`mobile-active-${activeBranch.id}`}
            className="branch-graph__route branch-graph__route--active"
            d={activeBranch.mobilePath}
            pathLength="1"
          />
          <path
            key={`mobile-packet-${activeBranch.id}`}
            className="branch-graph__packet"
            d={activeBranch.mobilePath}
            pathLength="100"
          />
          <circle className="branch-graph__endpoint" cx="34" cy="26" r="4" />
          <circle className="branch-graph__endpoint branch-graph__endpoint--production" cx="34" cy="286" r="5" />
        </svg>
        <span className="branch-graph__terminal branch-graph__terminal--main">main</span>
        <span className="branch-graph__terminal branch-graph__terminal--production">production</span>
        {branchButtons("mobile")}
      </div>

      <div id="branch-graph-detail" className="branch-graph__detail">
        <p>
          <span>HEAD · {activeBranch.label}</span>
          {activeBranch.detail}
        </p>
        <a href={activeBranch.evidenceHref}>
          {activeBranch.evidenceLabel}
          <span aria-hidden="true"> ↘</span>
        </a>
      </div>
    </aside>
  );
};

export default BranchGraph;
