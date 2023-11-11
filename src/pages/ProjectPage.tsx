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
import postNewPortfolioEntry from "../api/postNewPortfolioEntry";

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

  const onSubmitEntry = async () => {
    console.log("test");

    const startDateFormat =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    const endDateFormat =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();

    const filteredTechnologies = technologies
      .filter((t) => t.isChecked)
      .map((t) => t.technology);

    console.log(filteredTechnologies);
    console.log(roleValue);
    console.log(repoLink);
    const resultObject = {
      id: 44,
      userId : 1,
      roleValue: roleValue,
      startDate: startDateFormat,
      endDate: endDateFormat,
      role: roleValue,
      technologies: filteredTechnologies,
      description: "",
      repoLink: repoLink,
    };
    console.log(resultObject);
    await postNewPortfolioEntry(resultObject);
  };

  const onCheckedTechnology = (id: number) => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) => {
        if (technology.id === id) {
          const technologyCheck = technology.isChecked;
          return { ...technology, isChecked: !technologyCheck };
        } else {
          return { ...technology };
        }
      })
    );
  };

  console.log(technologies);
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
