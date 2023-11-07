import Skill from "../../types/Skill";
import SkillEntry from "../SkillEntry/SkillEntry";
import "./SkillList.css"

interface SkillListProps {
  skills: Array<Skill>;
}

const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  return (
    <div className="skill-entries">
      {skills.map((skill) => (
        <SkillEntry key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
export default SkillList;
