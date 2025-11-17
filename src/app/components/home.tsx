import React from "react";
import Header from "./header";
import "../globals.css";
import ExperienceSection from "./experience_section";
import Projects from "./project_section";
import AboutMe from "./about_me";
import ContactMe from "./contact_me";
import EducationSection from "./education_section";
import AwardsSection from "./award_section";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 dark:bg-gradient-to-br dark:from-background-dark dark:via-gray-900 dark:to-background-dark dark:text-foreground-dark min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        <section id="home" className="text-center scroll-mt-16 py-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight pb-2">Eugene Cho</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium">Computer Science • Full Stack Developer • Bioinformatics</p>
        </section>

        {/* About Me Section */}
        <section id="about" className="scroll-mt-16">
          <AboutMe />
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-16">
          <ExperienceSection />
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-16">
          <EducationSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-16">
          <Projects />
        </section>

        {/* Award Section */}
        <section id="awards" className="scroll-mt-16">
          <AwardsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-16">
          <ContactMe />
        </section>
      </main>
    </div>
  );
};

export default Home;
