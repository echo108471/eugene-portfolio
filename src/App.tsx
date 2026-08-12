import React from "react";
import Header from "@/components/header";
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
import { useLastCommitLabel } from "@/use-last-commit";

const App: React.FC = () => {
  const lastCommit = useLastCommitLabel();

  return (
    <div className="site-shell">
      <Header />

      <main className="site-container pb-14">
        <section
          id="home"
          className="scroll-mt-24 py-16 xs:py-20 sm:py-24"
        >
          <div className="hero-grid">
            <div className="diff-block">
              <div className="diff-gutter">
                <span className="tilde">~</span>
                <span className="plus">+</span>
                <span className="plus">+</span>
              </div>
              <div className="diff-body">
                <p className="eyebrow">// eugene-cho · software-engineer · last commit {lastCommit}</p>
                <p className="hero-name">Eugene Cho</p>
                <h1 className="display-title">
                  Backend systems, <em>applied AI</em>, and products people rely on.
                </h1>

                <p className="lede">
                  I&apos;m a UC Davis computer science graduate who moves between platform engineering
                  and product ownership—from air-gapped AI deployments and multi-agent services to
                  healthcare backends and course search used by 60K+ people.
                </p>

                <div className="button-row mt-8">
                  <a
                    href="#experience"
                    className="btn btn-primary"
                  >
                    experience
                    <span aria-hidden="true">↘</span>
                  </a>
                  <a
                    href="/EugeneChoResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    resume.pdf
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="mailto:eugene.a.cho@gmail.com"
                    className="btn btn-ghost"
                  >
                    email
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <aside className="hero-profile" aria-label="Current engineering profile">
              <div className="diffbox">
                <div className="diff-head">
                  <span>profile.md</span>
                  <span>@@ current focus @@</span>
                </div>
                <div className="diff-row rem">
                  <span className="sign">-</span>
                  <span className="content">aspiring web developer</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">backend &amp; platform engineering</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">applied AI in constrained environments</span>
                </div>
                <div className="diff-row add">
                  <span className="sign">+</span>
                  <span className="content">product ownership at production scale</span>
                </div>
              </div>

              <div className="hero-signals" aria-label="Selected engineering outcomes">
                <div className="hero-signal">
                  <strong>60K+</strong>
                  <span>Cattlelog unique users</span>
                </div>
                <div className="hero-signal">
                  <strong>500K+</strong>
                  <span>monthly healthcare sessions</span>
                </div>
                <div className="hero-signal">
                  <strong>99.9%</strong>
                  <span>Cattlelog uptime</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="scroll-mt-16">
          <AboutMe />
        </section>

        <section id="experience" className="scroll-mt-16">
          <ExperienceSection />
        </section>

        <section id="history" className="scroll-mt-16">
          <ReleaseHistory />
        </section>

        <section id="projects" className="scroll-mt-16">
          <Projects />
        </section>

        <section id="skills" className="scroll-mt-16">
          <SkillsSection />
        </section>

        <section id="education" className="scroll-mt-16">
          <EducationSection />
        </section>

        <section id="awards" className="scroll-mt-16">
          <AwardsSection />
        </section>

        <section id="contact" className="scroll-mt-16">
          <ContactMe />
        </section>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
