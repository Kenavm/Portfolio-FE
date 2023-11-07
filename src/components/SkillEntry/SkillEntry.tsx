import Skill from "../../types/Skill";
import "./SkillEntry.css";

interface SkillEntryProps {
  skill: Skill;
}

const SkillEntry: React.FC<SkillEntryProps> = ({ skill }) => {
  return (
      <div className="entry-container" key={skill.id}>
        <div className="technology">
          <p>
            {skill.name}
          </p>
        </div>
        <div className="level">
          {skill.level}
        </div>
      </div>
  );
};

export default SkillEntry;
