import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchPortfolioEntries from "../api/fetchPortfolioEntries";
import fetchSkillEntries from "../api/fetchSkillEntries";
import Entry from "../types/Entry";
import Skill from "../types/Skill";
import SkillList from "../components/SkillList/SkillList";
import Header from "../components/Header/Header";
import fetchPublicUser from "../api/fetchPublicUser";
import PublicUser from "../types/PublicUser";
import About from "../components/About/About";
import updatePortfolioEntry from "../api/updatePortfolioEntry";
import AddEntry from "../components/AddEntry/AddEntry";
import Technology from "../types/Technology";
import EditEntry from "../components/EditEntry/EditEntry";
import postNewPortfolioEntry from "../api/postNewPortfolioEntry";

const ProjectPage = () => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [publicUser, setPublicUser] = useState<PublicUser>();
  const [displayModal, setDisplayModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roleValue, setRoleValue] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [editedEntry, setEditedEntry] = useState<Entry>();

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchSkillEntries();
      setSkills(data);
    };

    const loadPortfolioEntries = async () => {
      const data = await fetchPortfolioEntries();
      setEntries(data);
    };

    const loadPublicUser = async () => {
      const data = await fetchPublicUser(1);
      setPublicUser(data);
    };

    const loadTechnologies = () => {
      const technologies = Object.keys(Technology).map((key, index) => ({
        id: index + 1,
        technology: Technology[key as keyof typeof Technology],
        isChecked: false,
      }));
      setTechnologies(technologies);
    };
 
    loadSkills();
    loadPortfolioEntries();
    loadPublicUser();
    loadTechnologies();
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

  const onclickAddEntry = () => {
    console.log("test");
  };

  const editEntry = (updatedEntry: Entry) => {
    updatePortfolioEntry(updatedEntry.id, updatedEntry);
  };

  const changeModalStatus = (id: number) => {
    const entry = entries.find((entry) => entry.id === id);
    setEditedEntry(entry);
    setDisplayModal(!displayModal);
  };


  const onSubmitEntry = () => {
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
     postNewPortfolioEntry(resultObject);
  };

  const onCheckedTechnology = (id: number) => {
    console.log(id);
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
      {publicUser && <About publicUser={publicUser} />}
      <PortfolioList
        entries={entries}
        onclickAddEntry={onclickAddEntry}
        onDisplayModal={(id: number) => changeModalStatus(id)}
      />
      <SkillList skills={skills} />
      
      { <AddEntry
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
        onChecked={(id) => onCheckedTechnology(id)}
      /> }
    
      {displayModal && (
        <EditEntry
          entry={editedEntry}
          onEditEntry={(updatedEntry: Entry) => editEntry(updatedEntry)}
          technologies = {technologies}
          cancel={(id) => changeModalStatus(id)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
