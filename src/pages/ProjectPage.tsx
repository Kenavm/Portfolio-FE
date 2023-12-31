import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import Entry from "../types/Entry";
import Header from "../components/Header/Header";
import fetchPageDTO from "../api/fetchPageDTO";
import About from "../components/About/About";
import updatePortfolioEntry from "../api/updatePortfolioEntry";
import AddEntry from "../components/AddEntry/AddEntry";
import EditEntry from "../components/EditEntry/EditEntry";
import postNewPortfolioEntry from "../api/postNewPortfolioEntry";
import React from "react";
import { useParams } from "react-router-dom";
import PageDTO from "../types/PageDTO";
import EditAbout from "../components/About/EditAbout";
import patchAboutDescription from "../api/patchAboutDescription";
import fetchAllTechnologies from "../api/fetchAllTechnologies";
import Technology from "../types/Technology";

const ProjectPage = () => {
  const [pageDTO, setPageDTO] = useState<PageDTO>();
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditAboutModal, setDisplayEditAboutModal] = useState(false);
  const [technologies, setTechnologies] = useState<
    {
      id: number;
      technology: string;
      isChecked: boolean;
    }[]
  >([]);
  const [editedEntry, setEditedEntry] = useState<Entry>();
  const { userId } = useParams();
  const [allTechnologies, setAllTechnologies] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const loadTechnologies = async () => {
      const fetchedTechnologies = await fetchAllTechnologies();
      setAllTechnologies(fetchedTechnologies);

      const transformedTechnologies = fetchedTechnologies.map(
        (tech: Technology) => ({
          id: tech.id,
          technology: tech.technologyName,
          isChecked: false,
        })
      );
      setTechnologies(transformedTechnologies);
    };

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
    if (about != undefined) {
      setDisplayEditAboutModal(about);
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

  const editDescription = async (newDescription: string) => {
    if (userId !== undefined && jwtToken !== null) {
      await patchAboutDescription(parseInt(userId), newDescription, jwtToken);
      await loadPageDTO();
      setDisplayEditAboutModal(false);
    }
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
                skills={pageDTO?.publicUser.skillList}
                technologies={allTechnologies}
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
            onDisplayAboutModal={() => changeModalStatus(undefined, false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
