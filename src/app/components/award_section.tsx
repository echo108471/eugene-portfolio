import React from "react";

interface AwardCardProps {
  name: string;
  organization: string;
  link: string;
}

const AwardCard: React.FC<AwardCardProps> = ({ name, organization, link }) => {
  const baseClasses = "block bg-white rounded-lg p-6 border border-gray-200 dark:bg-innerbox-dark dark:border-accent-dark";
  const hoverClasses = link ? "group transition-all duration-200 hover:shadow-2xl hover:border-gray-400 dark:hover:border-gray-500" : "";
  
  const content = (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground-dark">
          {name}
        </h3>
      </div>
      <p className="mt-2 text-gray-700 dark:text-innertext-dark">
        {organization}
      </p>
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverClasses}`}
    >
      {content}
    </a>
  ) : (
    <div className={baseClasses}>
      {content}
    </div>
  );
};

const Awards: React.FC = () => {
  const awards = [
    {
      name: "Eagle Scout Award",
      organization: "Boy Scouts of America",
      link: "https://www.scouting.org/",
    },
    {
      name: "ACSL Intermediate Division Finalist",
      organization: "American Computer Science League",
      link: "https://www.acsl.org/",
    },
    {
      name: "Ventura County Fire Department Citizen Award",
      organization: "Ventura County Fire Department",
      link: "https://vcfd.org/",
    },
  ];

  return (
    <section className="bg-white-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <AwardCard
              key={index}
              name={award.name}
              organization={award.organization}
              link={award.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
