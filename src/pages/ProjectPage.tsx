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
import React from "react";
import { useParams } from "react-router-dom";

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
  const { userId } = useParams();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const loadSkills = async () => {
      if (jwtToken !== null) {
        const skills = await fetchSkillEntries(jwtToken);
        setSkills(skills);
      }
    };

    const loadPublicUser = async () => {
      if (jwtToken !== null && userId !== undefined) {
        const user = await fetchPublicUser(parseInt(userId), jwtToken);
        setPublicUser(user);
      }
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
    if (jwtToken !== null && userId !== undefined) {
      const entries = await fetchPortfolioEntries(parseInt(userId), jwtToken);
      const sortedEntries = entries.sort((a: Entry, b: Entry) => a.id < b.id);
      setEntries(sortedEntries);
    }
  };

  const editEntry = (updatedEntry: Entry) => {
    if (jwtToken !== null) {
    updatePortfolioEntry(updatedEntry.id, updatedEntry, jwtToken);
    }
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
    if (jwtToken !== null) {
    await postNewPortfolioEntry(newEntry, jwtToken);
    await loadPortfolioEntries();
    changeModalStatus();
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="flex h-screen">
          <div className="flex-none">
            {publicUser && <About publicUser={publicUser} />}
          </div>
          <div className="flex-grow overflow-y-auto">
            <PortfolioList
              entries={entries}
              onDisplayEditModal={(id: number) => changeModalStatus(id)}
              onDisplayAddModal={() => changeModalStatus()}
            />
          </div>
        </div>

        <SkillList skills={skills} />
        <div className="">
          {displayAddModal && userId && (
            <AddEntry
              technologies={technologies}
              userId={parseInt(userId)}
              onAddEntry={(newEntry: Entry) => addEntry(newEntry)}
              cancel={() => changeModalStatus()}
            />
          )}
        </div>

        {displayEditModal && editedEntry && (
          <EditEntry
            entry={editedEntry}
            onEditEntry={(updatedEntry: Entry) => editEntry(updatedEntry)}
            technologies={technologies}
            cancel={(id: number) => changeModalStatus(id)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
