import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchPortfolioEntries from "../api/fetchPortfolioEntries";
import fetchSkillEntries from "../api/fetchSkillEntries";
import Entry from '../types/Entry'
import Skill from '../types/Skill'
import SkillList from "../components/SkillList/SkillList";
import Header from '../components/Header/Header'

const ProjectPage = () => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchSkillEntries();
      setSkills(data);
    };
    loadSkills();
  }, []);

  useEffect(() => {
    const loadPortfolioEntries = async () => {
      const data = await fetchPortfolioEntries();
      setEntries(data);
    };
    loadPortfolioEntries();
  }, []);

  const onclickAddEntry = () => {
    console.log("test");
  }

  return (
    <div>
      <Header />
      <PortfolioList entries={entries} onclickAddEntry={onclickAddEntry}/>
      <SkillList skills={skills} />
    </div>
  );
};

export default ProjectPage;
