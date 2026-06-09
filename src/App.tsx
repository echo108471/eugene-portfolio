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
import { useLastCommitLabel } from "@/use-last-commit";

const App: React.FC = () => {
  const lastCommit = useLastCommitLabel();

  return (
    <div className="site-shell">
      <Header />

      <main className="site-container pb-14">
        <section
          id="home"
          className="scroll-mt-24 py-20 xs:py-24 sm:py-28"
        >
          <div className="diff-block">
            <div className="diff-gutter">
              <span className="minus">-</span>
              <span className="plus">+</span>
              <span className="plus">+</span>
            </div>
            <div className="diff-body">
              <div>
                <div>
                  <p className="eyebrow">// portfolio · branch: main · last commit {lastCommit}</p>
                </div>

                <div>
                  <h1 className="display-title">
                    <span className="del-text">Aspiring web developer.</span>
                    <span className="diff-line add-text">
                      Hi, I&apos;m Eugene Cho.
                      <br />
                      I build <em>full-stack systems</em> with the user in mind.
                    </span>
                  </h1>
                </div>

                <div>
                  <p className="lede">
                    I&apos;m a UC Davis CS new grad and software engineering intern at Sealing Technologies.
                    I like full-stack work because it gives me the context to understand the whole system:
                    data, APIs, interface, and what the user is actually trying to do.
                    Recent work includes air-gapped LLM tooling, multi-agent backend services,
                    patient intake systems, and course tools used by UC Davis students.
                  </p>
                </div>

                <div>
                  <div className="button-row mt-8">
                    <a
                      href="#projects"
                      className="btn btn-primary"
                    >
                      projects
                      <span aria-hidden="true">↘</span>
                    </a>
                    <a
                      href="mailto:eugene.a.cho@gmail.com"
                      className="btn btn-secondary"
                    >
                      email
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href="/EugeneChoResume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      resume.pdf
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default App;
