import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import Entry from "../types/Entry";
import SkillList from "../components/SkillList/SkillList";
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
import fetchAllTechnologies from "../api/fetchAllTechnologies"; 


const ProjectPage = () => {
  const [pageDTO, setPageDTO] = useState<PageDTO>();
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
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
     const loadPageDTO = async () => {
      if (jwtToken !== null && userId !== undefined) {
        const user = await fetchPageDTO(parseInt(userId), jwtToken);
        console.log(user.portfolioEntryList);
        console.log(user);
        setPageDTO(user);
      }
    };

    const loadTechnologies = async () => {
      const fetchedTechnologies = await fetchAllTechnologies();
      setAllTechnologies(fetchedTechnologies);
      const transformedTechnologies = fetchedTechnologies.map(tech => ({
        id: tech.id,
        technology: tech.technologyName,
        isChecked: false
      }));
      setTechnologies(transformedTechnologies);
    };
  

    loadPageDTO();
    console.log(pageDTO);
    loadTechnologies();
  }, []);

  console.log(technologies);

  const editEntry = (updatedEntry: Entry) => {
    if (jwtToken !== null) {
      updatePortfolioEntry(updatedEntry.id, updatedEntry, jwtToken);
    }
  };

  const changeModalStatus = (id?: number) => {
    console.log(id);
    if (id !== undefined && pageDTO !== undefined) {
      const entry = pageDTO.portfolioEntryList.find((entry) => entry.id === id);
      console.log(entry);
      setEditedEntry(entry);
      setDisplayEditModal(!displayEditModal);
    } else {
      setDisplayAddModal(!displayAddModal);
    }
  };

  const addEntry = async (newEntry: Entry) => {
    if (jwtToken !== null) {
      await postNewPortfolioEntry(newEntry, jwtToken);
      changeModalStatus();
    }
  };

  console.log(pageDTO?.publicUser.skillList);

  return (
    <div>
      <Header />
      <div>
        <div className="flex h-screen">
          <div className="flex-none">
            {pageDTO?.publicUser && <About publicUser={pageDTO.publicUser} />}
          </div>
          <div className="flex-grow overflow-y-auto">
            {pageDTO && (
              <PortfolioList
                entries={pageDTO.portfolioEntryList}
                onDisplayEditModal={(id: number) => changeModalStatus(id)}
                onDisplayAddModal={() => changeModalStatus()}
                loggedIn= {true}
              />
            )}
          </div>
        </div>

      {pageDTO?.publicUser.skillList !== undefined ? ( <SkillList skills={pageDTO?.publicUser.skillList} technologies={allTechnologies} /> ): (<p></p>)}
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
