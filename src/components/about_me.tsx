import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

const AboutMe: React.FC = () => {
  const facts = [
    "B.S. Computer Science at UC Davis, Jun. 2026",
    "Software Engineer Intern at Sealing Technologies (a Parsons Company)",
    "Built systems used by 500K+ monthly healthcare sessions",
    "Shipped course tooling reaching 40K+ UC Davis students",
  ];

  return (
    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <span className="section-num">01</span>
          <h2 className="section-title">About, as a diff</h2>
          <span className="section-note">bio.md · revised</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.55fr)] lg:items-start">
          <div className="diff-block">
            <div className="diff-gutter">
              <span className="tilde">~</span>
            </div>
            <div className="diff-body">
              <div className="diffbox">
                <div className="diff-head">
                  <span>bio.md</span>
                  <span>@@ -1,2 +1,4 @@</span>
                </div>
                <div className="diff-row rem">
                  <span className="sign">-</span>
                  <span className="content">I&apos;m learning to code and looking for my first opportunity.</span>
                </div>
                <div className="diff-row rem">
                  <span className="sign">-</span>
                  <span className="content">I make websites and small apps.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">I&apos;m a UC Davis CS new grad and Software Engineer Intern at Sealing Technologies.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">I build backend-heavy full-stack systems for real workflows.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">Recent work spans air-gapped LLM platforms, multi-agent systems, patient intake, and course tooling.</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">I care about clear APIs, reliable data flows, and product details that hold up.</span>
                </div>
              </div>

              <a
                href="mailto:eugene.a.cho@gmail.com"
                className="link-arrow mt-6"
              >
                eugene.a.cho@gmail.com
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="surface-card p-5">
            <p className="meta-text mb-4">current facts · kept close to the work</p>
            <div className="grid gap-3">
            {facts.map((fact) => (
              <div
                key={fact}
                className="flex gap-3 border-t border-[var(--line)] pt-3 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 font-mono text-sm text-[var(--add)]">+</span>
                <p className="body-copy text-sm">
                  {fact}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutMe;
