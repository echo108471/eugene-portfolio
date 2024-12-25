import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

const ContactMe: React.FC = () => {
  return (
    <section className="mt-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900">Contact Me</h2>
      <p className="mt-4 text-gray-700">
        I&apos;m always open to opportunities, collaborations, or feedback. Feel free to reach out to me through any of the platforms below.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
        {/* Email */}
        <a
          href="mailto:eugene.a.cho@gmail.com"
          className="flex items-center text-gray-700 hover:text-blue-600 transition"
        >
          <FaEnvelope className="mr-2 w-6 h-6" />
          eugene.a.cho@gmail.com
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Echo108471"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <FaGithub className="mr-2 w-6 h-6" />
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/eugene-cho-8b4376218/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-blue-700 transition"
        >
          <FaLinkedin className="mr-2 w-6 h-6" />
          LinkedIn
        </a>

        {/* Resume */} 
        <a
          href="EugeneChoResumeFinal.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-red-600 transition"
        >
          <FaFilePdf className="mr-2 w-6 h-6" />
          Resume
        </a>
      </div>
    </section>
  );
};

export default ContactMe;
