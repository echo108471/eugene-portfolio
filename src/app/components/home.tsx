import React from "react";
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  MapPinIcon,
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
import { MotionChild, Reveal, Stagger } from "./motion";

const Home: React.FC = () => {
  const focusChips = [
    "Multi-agent platforms",
    "Event-driven backend services",
    "Real-time collaboration",
    "Healthcare and education tooling",
  ];

  return (
    <div className="min-h-screen text-slate-950 dark:text-foreground-dark">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <section
          id="home"
          className="scroll-mt-24 py-16 sm:py-20 lg:min-h-[calc(100vh-76px)] lg:py-24"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.7fr)]">
            <Stagger className="max-w-4xl">
              <MotionChild>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm shadow-indigo-900/5 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">
                  <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                  Persist AI intern, UC Davis CS senior, full-stack systems builder
                </div>
              </MotionChild>

              <MotionChild>
                <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                  Eugene Cho
                  <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Software Engineer
                  </span>
                </h1>
              </MotionChild>

              <MotionChild>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-innertext-dark">
                  I build backend-heavy products for healthcare, education,
                  pharmaceutical workflows, and real-time collaboration.
                </p>
              </MotionChild>

              <MotionChild>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100"
                  >
                    <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
                    View projects
                    <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:eacho@ucdavis.edu"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
                  >
                    <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                    Contact
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <a
                    href="/EugeneChoResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:text-cyan-700 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400/40 dark:hover:text-cyan-200"
                  >
                    <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                    Resume
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </MotionChild>

              <MotionChild>
                <div className="mt-7 flex flex-wrap gap-2">
                  {focusChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </MotionChild>
            </Stagger>

            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white/70 p-5 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/25">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Current focus
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                      Building useful systems with real users
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    Present
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    ["22", "specialized backend agents integrated"],
                    ["500K+", "monthly healthcare sessions processed"],
                    ["40K+", "Cattlelog unique users reached"],
                  ].map(([value, label]) => (
                    <div
                      key={value}
                      className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/40"
                    >
                      <p className="text-2xl font-bold text-slate-950 dark:text-white">
                        {value}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPinIcon className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                  Davis, CA / Sacramento, CA
                </div>
              </div>
            </Reveal>
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
