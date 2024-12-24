import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="bg-white-100 py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">About Me</h2>
            <div className="space-y-8">
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                    <p className="mt-4 text-gray-700">
                        I am a computer science enthusiast with a passion for bioinformatics and software development. My experience spans developing
                        algorithms for CRISPR research, engineering database solutions for advanced drug screening, and full stack development. If you
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
