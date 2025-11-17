import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">About Me</h2>
            <div className="space-y-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark">
                    <p className="mt-4 text-gray-700 dark:text-innertext-dark leading-relaxed">
                        Senior at the University of California, Davis majoring in Computer Science with interests in bioinformatics and full-stack development. 
                        Experience spans building scalable web applications, implementing bioinformatics pipelines for genomic data analysis, and developing 
                        algorithms for CRISPR research. Passionate about leveraging technology to solve complex problems in healthcare and education. 
                        Currently seeking full-time opportunities in software engineering and bioinformatics. Reach out at{" "}
                        <a href="mailto:eugene.a.cho@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
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
