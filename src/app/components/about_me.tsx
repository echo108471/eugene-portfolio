import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">About Me</h2>
            <div className="space-y-8">
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark">
                    <p className="mt-4 text-gray-700 dark:text-innertext-dark">
                        I&apos;m a current senior at the University of California, Davis majoring in Computer Science.
                        My current interests include bioinformatics and full stack development. My experience spans writing
                        algorithms for CRISPR research, utilizing bioinformatics pipelines, and developing web applications for students. If you
                        would like to learn more about my work or have any feedback, please reach out to me at{" "}
                        <a href="mailto:eugene.a.cho@gmail.com" className="text-blue-600 hover:underline">
                        eugene.a.cho@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AboutMe;
