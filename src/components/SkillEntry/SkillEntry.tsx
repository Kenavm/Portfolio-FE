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
  const [technologyName, setTechnologyName] = useState(
    setStartingTechnologyName
  );

  console.log(skill);

  function setStartingTechnologyName() {
    return technologies.find((t) => t.id == skill.idTechnology)?.technologyName;
  }
  return (
    <div className="entry-container" key={skill.id}>
      <div className="technology">
        <p>{technologyName}</p>
      </div>
      <div className="level">{String(skill.skillLevel)}</div>
    </div>
  );
};

export default SkillEntry;
