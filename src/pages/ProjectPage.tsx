import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchPortfolioEntries from "../api/fetchPortfolioEntries";
import fetchSkillEntries from "../api/fetchSkillEntries";
import Entry from "../types/Entry";
import Skill from "../types/Skill";
import SkillList from "../components/SkillList/SkillList";
import Header from "../components/Header/Header";
import AddEntry from "../components/AddEntry/AddEntry";
import Technology from "../types/Technology";

const ProjectPage = () => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roleValue, setRoleValue] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [technologies, setTechnologies] = useState([]);

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

  useEffect(() => {
    const loadTechnologies = () => {
      const technologies = Object.keys(Technology).map((key, index) => ({
        id: index + 1,
        technology: Technology[key as keyof typeof Technology],
        isChecked: false,
      }));
      setTechnologies(technologies);
    };

    loadTechnologies();
  }, []);

  const onSubmitEntry = () => {
    console.log("test");
  };

  const onCheckedTechnology = (id: number) => {
    console.log(id);
  
  };

  return (
    <div>
      <Header />
      <PortfolioList entries={entries} />
      <SkillList skills={skills} />
      <AddEntry
        onSubmitEntry={onSubmitEntry}
        startDate={startDate}
        onChangeStartDate={(date) => setStartDate(date)}
        endDate={endDate}
        onChangeEndDate={(date) => setEndDate(date)}
        roleValue={roleValue}
        onChangeRole={(event) => setRoleValue(event.target.value)}
        repoLink={repoLink}
        onChangeLink={(event) => setRepoLink(event.target.value)}
        technologiesArray={technologies}
        onChecked={onCheckedTechnology}
      />
    </div>
  );
};

export default ProjectPage;
