import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

const ContactMe: React.FC = () => {
  return (
    <section className="mt-10 bg-white rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-foreground-dark">Contact Me</h2>
      <p className="mt-4 text-gray-700 dark:text-innertext-dark">
        I&apos;m always open to opportunities, collaborations, or feedback. Feel free to reach out to me through any of the platforms below.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
        {/* Email */}
        <a
          href="mailto:eacho@ucdavis.edu"
          className="flex items-center text-gray-700 hover:text-blue-600 transition dark:text-innertext-dark dark:hover:text-blue-600"
        >
          <FaEnvelope className="mr-2 w-6 h-6" />
          eacho@ucdavis.edu
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/echo108471"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-gray-900 transition dark:text-innertext-dark dark:hover:text-gray-900"
        >
          <FaGithub className="mr-2 w-6 h-6" />
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/eachoo/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-blue-700 transition dark:text-innertext-dark dark:hover:text-blue-700"
        >
          <FaLinkedin className="mr-2 w-6 h-6" />
          LinkedIn
        </a>

        {/* Resume */} 
        <a
          href="EugeneChoResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-red-600 transition dark:text-innertext-dark dark:hover:text-red-600"
        >
          <FaFilePdf className="mr-2 w-6 h-6" />
          Resume
        </a>
      </div>
    </section>
  );
};

export default ContactMe;
