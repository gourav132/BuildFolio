import React from "react";

import StaticTechDisplay from "./StaticTechDisplay";
import { SectionWrapper } from "@hoc";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { technologies } from "@constants";

const Tech = () => {
  const { skills, loading } = usePortfolioData();

  if (loading) {
    return <div className="text-white text-center py-10 italic">Loading technical expertise...</div>
  }

  // Use custom skills if available, otherwise fall back to default technologies
  const displaySkills = skills && skills.length > 0
    ? skills
    : technologies;

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {displaySkills.map((skill) => (
        <StaticTechDisplay
          key={skill.skill_name || skill.id || skill.name}
          icon={skill.icon_url || skill.icon}
          name={skill.skill_name || skill.name}
          level={skill.proficiency || skill.level}
        />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");