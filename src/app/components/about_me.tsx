import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">About Me</h2>
            <div className="space-y-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark">
                    <p className="text-gray-700 dark:text-innertext-dark leading-relaxed">
                        Hi! I&apos;m a senior studying Computer Science at UC Davis, passionate about full-stack development. I enjoy building projects that have real world applications, especially where software and other fields intersect. A lot of my recent work has been in healthcare and education, and I&apos;m excited about roles where I can keep solving interesting, meaningful problems with code. I&apos;m currently looking for full-time opportunities in software engineering — feel free to reach out at{" "}
                        <a href="mailto:eugene.a.cho@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
                        eugene.a.cho@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AboutMe;
