import React from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import LivingBranch from "@/components/living-branch";
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
    <div className="site-shell">
      <Header />

      <main className="site-container pb-14">
        <div className="living-intro">
          <LivingBranch />

          <section id="home" className="scroll-mt-24">
            <HeroSection />
          </section>

          <section id="about" className="living-intro__about scroll-mt-16">
            <AboutMe />
          </section>

          <section id="experience" className="living-intro__experience scroll-mt-16">
            <ExperienceSection />
          </section>
        </div>

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
