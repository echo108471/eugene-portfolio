import React from "react";
import Header from "./header";
import "../globals.css";
import ExperienceSection from "./experience_section";
import Projects from "./project_section";
import AboutMe from "./about_me";
import ContactMe from "./contact_me";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-background-dark dark:text-foreground-dark">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        <section id="home" className="text-center scroll-mt-16">
          <h1 className="text-4xl font-bold">Eugene Cho</h1>
        </section>

        {/* About Me Section */}
        <section id="about" className="scroll-mt-16">
          <AboutMe />
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-16">
          <ExperienceSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-16">
          <Projects />
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
