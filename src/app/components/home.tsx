import React from "react";
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Header from "./header";
import "../globals.css";
import ExperienceSection from "./experience_section";
import Projects from "./project_section";
import AboutMe from "./about_me";
import ContactMe from "./contact_me";
import EducationSection from "./education_section";
import AwardsSection from "./award_section";
import Timeline from "./timeline";
import SkillsSection from "./skills_section";
import { MotionChild, Stagger } from "./motion";

const Home: React.FC = () => {

  return (
    <div className="min-h-screen text-slate-950 dark:text-foreground-dark">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <section
          id="home"
          className="flex flex-col justify-center scroll-mt-24 py-16 sm:py-20 lg:min-h-[calc(100vh-76px)] lg:py-24"
        >
          <div className="flex flex-col gap-10 max-w-4xl">
            <Stagger>
              <MotionChild>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm shadow-indigo-900/5 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">
                  <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                  Persist AI intern, UC Davis CS senior, full-stack systems builder
                </div>
              </MotionChild>

              <MotionChild>
                <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                  Hi, I&apos;m Eugene Cho.
                  <span className="block bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text mt-2 text-transparent text-4xl sm:text-5xl lg:text-6xl">
                    Software Engineer
                  </span>
                </h1>
              </MotionChild>

              <MotionChild>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-innertext-dark">
                  I&apos;m a UC Davis CS senior and software engineering intern at Persist AI. I build
                  backend-heavy full-stack systems across healthcare, education, and bioinformatics,
                  with recent work in agents, real-time collaboration, and production APIs.
                </p>
              </MotionChild>

              <MotionChild>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-slate-950"
                  >
                    <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
                    View projects
                    <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:eacho@ucdavis.edu"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200 hover:text-indigo-700 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
                  >
                    <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                    Contact
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <a
                    href="/EugeneChoResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-cyan-200 hover:text-cyan-700 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400/40 dark:hover:text-cyan-200"
                  >
                    <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                    Resume
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </MotionChild>
            </Stagger>
          </div>
        </section>

        <section id="about" className="scroll-mt-16">
          <AboutMe />
        </section>

        <section id="timeline" className="scroll-mt-16">
          <Timeline />
        </section>

        <section id="experience" className="scroll-mt-16">
          <ExperienceSection />
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
