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
    const loadPublicUser = async () => {
      const data = await fetchPublicUser(1);
      setPublicUser(data);
    };
    loadPublicUser();
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

  const openModal = (id: number) => {
    const entry = entries.find((entry) => entry.id === id);
    setEditedEntry(entry);
    setDisplayModal(!displayModal);
  };

  const closeModal = () =>  {
    setDisplayModal(!displayModal)
  }

  const onSubmitEntry = () => {
    console.log("test");
  };

  const onCheckedTechnology = (id: number) => {
    console.log(id);
  };

  return (
    <div>
      <Header />
      {publicUser && <About publicUser={publicUser} />}
      <PortfolioList
        entries={entries}
        onclickAddEntry={onclickAddEntry}
        onDisplayModal={(id: number) => openModal(id)}
      />
      <SkillList skills={skills} />
      
      {/* <AddEntry
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
      /> */}
    
      {displayModal && (
        <EditEntry
          entry={editedEntry}
          onEditEntry={(updatedEntry: Entry) => editEntry(updatedEntry)}
          technologies = {technologies}
          cancel={closeModal}
        />
      )}
    </div>
  );
};

export default ProjectPage;
