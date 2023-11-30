import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchSkillEntries from "../api/fetchSkillEntries";
import Entry from "../types/Entry";
import Skill from "../types/Skill";
import SkillList from "../components/SkillList/SkillList";
import Header from "../components/Header/Header";
import fetchPageDTO from "../api/fetchPageDTO";
import About from "../components/About/About";
import updatePortfolioEntry from "../api/updatePortfolioEntry";
import AddEntry from "../components/AddEntry/AddEntry";
import Technology from "../types/Technology";
import EditEntry from "../components/EditEntry/EditEntry";
import postNewPortfolioEntry from "../api/postNewPortfolioEntry";
import React from "react";
import { useParams } from "react-router-dom";
import PageDTO from "../types/PageDTO";
import EditAbout from "../components/About/EditAbout";
import patchAboutDescription from "../api/patchAboutDescription";

const ProjectPage = () => {
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [pageDTO, setPageDTO] = useState<PageDTO>();
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditAboutModal, setDisplayEditAboutModal] = useState(false);
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

    const loadTechnologies = () => {
      const technologies = Object.keys(Technology).map((key, index) => ({
        id: index + 1,
        technology: Technology[key as keyof typeof Technology],
        isChecked: false,
      }));
      setTechnologies(technologies);
    };

    loadSkills();
    loadPageDTO();
    loadTechnologies();
  }, []);
  const loadPageDTO = async () => {
    if (jwtToken !== null && userId !== undefined) {
      const user = await fetchPageDTO(parseInt(userId), jwtToken);
      setPageDTO(user);
    }
  };

  const editEntry = (updatedEntry: Entry) => {
    if (jwtToken !== null) {
      updatePortfolioEntry(updatedEntry.id, updatedEntry, jwtToken);
    }
  };

  const changeModalStatus = (id?: number, about?: boolean) => {
    if (about) {
      setDisplayEditAboutModal(true);
    } else if (id !== undefined) {
      const entry = pageDTO?.portfolioEntryList.find(
        (entry) => entry.id === id
      );
      setEditedEntry(entry);
      setDisplayEditModal(!displayEditModal);
    } else {
      setDisplayAddModal(!displayAddModal);
    }
  };

  const addEntry = async (newEntry: Entry) => {
    if (jwtToken !== null) {
      await postNewPortfolioEntry(newEntry, jwtToken);
      await loadPageDTO();
      changeModalStatus();
    }
  };

  const editDescription = async (editedDescription: string) => {
    console.log(editedDescription);
    await patchAboutDescription(parseInt(userId), editedDescription, jwtToken);
    await loadPageDTO();
  };

  return (
    <div>
      <Header />
      <div>
        <div className="flex h-screen">
          <div className="flex-none">
            {pageDTO?.publicUser && (
              <About
                onDisplayEditAboutModal={() =>
                  changeModalStatus(undefined, true)
                }
                publicUser={pageDTO.publicUser}
                loggedIn={true}
              />
            )}
          </div>
          <div className="flex-grow overflow-y-auto">
            {pageDTO && (
              <PortfolioList
                entries={pageDTO.portfolioEntryList}
                onDisplayEditModal={(id: number) => changeModalStatus(id)}
                onDisplayAddModal={() => changeModalStatus()}
                loggedIn={true}
              />
            )}
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
        {displayEditAboutModal && pageDTO && (
          <EditAbout
            description={pageDTO.publicUser.aboutDescription}
            onEditAbout={editDescription}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
