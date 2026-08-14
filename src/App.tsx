import React from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AsciiTreeCanvas from "@/components/ascii-tree-canvas";
import MetricsSection from "@/components/metrics-section";
import ExperienceSection from "@/components/experience-section";
import Projects from "@/components/project-section";
import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";
import EducationSection from "@/components/education-section";
import AwardsSection from "@/components/award-section";
import SkillsSection from "@/components/skills-section";
import ReleaseHistory from "@/components/release-history";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App: React.FC = () => {
  return (
    <div className="site-shell ascii-site relative">
      <Header />
      <AsciiTreeCanvas />

      <main className="ascii-main relative z-10 pb-14">
        <section id="home" className="site-container scroll-mt-24">
          <HeroSection />
        </section>

        <div className="site-container ascii-repo-layout">
          <div className="ascii-branch-stream">
            <section
              id="metrics"
              className="ascii-branch-section scroll-mt-20"
              data-ref="refs/impact"
              data-tree-side="left"
            >
              <MetricsSection />
            </section>

            <section
              id="about"
              className="ascii-branch-section scroll-mt-20"
              data-ref="bio.md"
              data-tree-side="right"
            >
              <AboutMe />
            </section>

            <section
              id="experience"
              className="ascii-branch-section scroll-mt-20"
              data-ref="worktree"
              data-tree-side="left"
            >
              <ExperienceSection />
            </section>

            <section
              id="projects"
              className="ascii-branch-section scroll-mt-20"
              data-ref="refs/selected"
              data-tree-side="right"
            >
              <Projects />
            </section>

            <section
              id="skills"
              className="ascii-branch-section scroll-mt-20"
              data-ref="skills.lock"
              data-tree-side="left"
            >
              <SkillsSection />
            </section>

            <section
              id="history"
              className="ascii-branch-section scroll-mt-20"
              data-ref="git/log"
              data-tree-side="right"
            >
              <ReleaseHistory />
            </section>

            <section
              id="education"
              className="ascii-branch-section scroll-mt-20"
              data-ref="roots/education"
              data-tree-side="left"
            >
              <EducationSection />
            </section>

            <section
              id="awards"
              className="ascii-branch-section scroll-mt-20"
              data-ref="tags/milestones"
              data-tree-side="right"
            >
              <AwardsSection />
            </section>

            <section
              id="contact"
              className="ascii-branch-section ascii-branch-section--last scroll-mt-20"
              data-ref="remotes"
              data-tree-side="left"
            >
              <ContactMe />
            </section>
          </div>
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
