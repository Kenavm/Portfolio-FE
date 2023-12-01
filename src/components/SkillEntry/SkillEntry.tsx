import React from "react";
import Skill from "../../types/Skill";
import "./SkillEntry.css";
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

  return (
    <div className="entry-container flex items-center" key={skill.id}>
      <div className="technology">
        <p>{technologyName?.replace("_", " ")}</p>
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
