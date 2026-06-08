import React from "react";
import "@/globals.css";
import Header from "@/components/header";
import ExperienceSection from "@/components/experience_section";
import Projects from "@/components/project_section";
import AboutMe from "@/components/about_me";
import ContactMe from "@/components/contact_me";
import EducationSection from "@/components/education_section";
import AwardsSection from "@/components/award_section";
import SkillsSection from "@/components/skills_section";
import ReleaseHistory from "@/components/release_history";
import { MotionChild, Stagger } from "@/components/motion";
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
              <Stagger>
                <MotionChild>
                  <p className="eyebrow">// portfolio · branch: main · last commit {lastCommit}</p>
                </MotionChild>

                <MotionChild>
                  <h1 className="mt-7 display-title">
                    <span className="del-text">Aspiring web developer.</span>
                    <span className="diff-line add-text">
                      Hi, I&apos;m Eugene Cho.
                      <br />
                      I build <em>full-stack systems</em> with the user in mind.
                    </span>
                  </h1>
                </MotionChild>

                <MotionChild>
                  <p className="lede">
                    I&apos;m a UC Davis CS new grad and software engineering intern at Sealing Technologies.
                    I like full-stack work because it gives me the context to understand the whole system:
                    data, APIs, interface, and what the user is actually trying to do.
                    Recent work includes air-gapped LLM tooling, multi-agent backend services,
                    patient intake systems, and course tools used by UC Davis students.
                  </p>
                </MotionChild>

                <MotionChild>
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
                </MotionChild>
              </Stagger>
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
