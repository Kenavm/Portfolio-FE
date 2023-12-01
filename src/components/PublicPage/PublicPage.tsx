import { useEffect, useState } from "react";
import PageDTO from "../../types/PageDTO";
import { useParams } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import About from "../About/About";
import PortfolioList from "../PortfolioEntries/PortfolioList";
import SkillList from "../SkillList/SkillList";
import fetchPageDTO from "../../api/fetchPageDTO";
import fetchAllTechnologies from "../../api/fetchAllTechnologies";

const PublicPage = () => {
  const [pageDTO, setPageDTO] = useState<PageDTO>();
  const [technologies, setAllTechnologies] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    loadAllTechnologies();
    loadPageDTO();
  }, []);

  const loadPageDTO = async () => {
    if (userId !== undefined) {
      const user = await fetchPageDTO(parseInt(userId));
      setPageDTO(user);
    }
  };

  const loadAllTechnologies = async () => {
    const allTechnologies = await fetchAllTechnologies();
    setAllTechnologies(allTechnologies);
  };

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
                loggedIn={false}
              />
            )}
          </div>
        </div>
        {pageDTO?.publicUser.skillList !== undefined ? (
          <SkillList
            skills={pageDTO?.publicUser.skillList}
            technologies={technologies}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default PublicPage;
