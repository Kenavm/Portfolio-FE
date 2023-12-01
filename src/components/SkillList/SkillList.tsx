import React from 'react';
import Skill from "../../types/Skill";
import SkillEntry from "../SkillEntry/SkillEntry";
import Technology from '../../types/Technology';
//import "./SkillList.css"

interface SkillListProps {
  skills: Array<Skill>;
  technologies: Array<Technology>
}

const SkillList: React.FC<SkillListProps> = ({ skills, technologies }) => {
  return (
    <div className="skill-entries">
      {skills.map((skill) => (
        <SkillEntry key={skill.id} skill={skill} technologies={technologies}/>
      ))}
    </div>
  );
};
export default SkillList;
