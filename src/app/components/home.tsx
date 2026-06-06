import React from "react";
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Header from "./header";
import "../globals.css";
import ExperienceSection from "./experience_section";
import Projects from "./project_section";
import AboutMe from "./about_me";
import ContactMe from "./contact_me";
import EducationSection from "./education_section";
import AwardsSection from "./award_section";
import SkillsSection from "./skills_section";
import ReleaseHistory from "./release_history";
import { MotionChild, Stagger } from "./motion";

const Home: React.FC = () => {

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
                  <p className="eyebrow">// portfolio - branch: main / UC Davis CS</p>
                </MotionChild>

                <MotionChild>
                  <h1 className="mt-7 display-title">
                    <span className="del-text">Aspiring web developer.</span>
                    <span className="diff-line add-text">
                      Hi, I&apos;m Eugene Cho.
                      <br />
                      I build <em>practical systems</em> end to end.
                    </span>
                  </h1>
                </MotionChild>

                <MotionChild>
                  <p className="lede">
                    I&apos;m a UC Davis CS senior and software engineering intern at Persist AI. I build
                    backend-heavy full-stack systems across healthcare, education, and bioinformatics,
                    with recent work in agents, real-time collaboration, and production APIs.
                  </p>
                </MotionChild>

                <MotionChild>
                  <div className="button-row mt-8">
                    <a
                      href="#projects"
                      className="btn btn-primary"
                    >
                      <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
                      Projects
                      <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="mailto:eacho@ucdavis.edu"
                      className="btn btn-secondary"
                    >
                      <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                      Email
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="/EugeneChoResume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                      Resume
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
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

export default Home;
