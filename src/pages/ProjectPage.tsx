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
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [technologies, setTechnologies] = useState<
    {
      id: number;
      technology: Technology;
      isChecked: boolean;
    }[]
  >([]);
  const [editedEntry, setEditedEntry] = useState<Entry>();

  useEffect(() => {
    const loadSkills = async () => {
      const skills = await fetchSkillEntries();
      setSkills(skills);
    };

    const loadPublicUser = async () => {
      const user = await fetchPublicUser(1);
      setPublicUser(user);
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

  const loadPortfolioEntries = async () => {
    const entries = await fetchPortfolioEntries();
    setEntries(entries);
  };

  const editEntry = (updatedEntry: Entry) => {
    updatePortfolioEntry(updatedEntry.id, updatedEntry);
  };

  const changeModalStatus = (id?: number) => {
    if (id !== undefined) {
      const entry = entries.find((entry) => entry.id === id);
      setEditedEntry(entry);
      setDisplayEditModal(!displayEditModal);
    } else {
      setDisplayAddModal(!displayAddModal);
    }
  };

  const addEntry = async (newEntry: Entry) => {
    await postNewPortfolioEntry(newEntry);
    await loadPortfolioEntries();
    changeModalStatus();
  };
 
  return (
    <div>
      <Header />
      {publicUser && <About publicUser={publicUser} />}
      <PortfolioList
        entries={entries}
        onDisplayEditModal={(id: number) => changeModalStatus(id)}
        onDisplayAddModal={() => changeModalStatus()}
      />
      <SkillList skills={skills} />

      {displayAddModal && (
        <AddEntry
          technologies={technologies}
          onAddEntry={(newEntry: Entry) => addEntry(newEntry)}
          cancel={() => changeModalStatus()}
        />
      )}

      {displayEditModal && editedEntry && (
        <EditEntry
          entry={editedEntry}
          onEditEntry={(updatedEntry: Entry) => editEntry(updatedEntry)}
          technologies={technologies}
          cancel={(id: number) => changeModalStatus(id)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
