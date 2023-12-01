import React from "react";
import Skill from "../../types/Skill";
import Technology from "../../types/Technology";
import { useState } from "react";

interface SkillEntryProps {
  skill: Skill;
  technologies: Array<Technology>;
}

const SkillEntry: React.FC<SkillEntryProps> = ({ skill, technologies }) => {
  const [technologyName] = useState(setStartingTechnologyName);

  function setStartingTechnologyName() {
    return technologies.find((t) => t.id === skill.idTechnology)
      ?.technologyName;
  }
  console.log(skill)
  return (
    <div className="skill-container flex items-center border border-solid border-black rounded-3xl p-2.5 text-center m-4 drop-shadow-md">
      <div className="technology p-5">
        <p className="text-sm">{`${technologyName?.charAt(0).toUpperCase()}${technologyName?.slice(1).toLowerCase().replace("_", " ")}`}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3.0 ml-2 dark:bg-gray-700">
        
        <div
          className="bg-[#FF2E63] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{
            width: `${skill.skillLevel * 8}%`,
            height: "100%",
            borderRadius: "inherit",
          }}
        />
      </div>
    </div>
  );
};

export default SkillEntry;
