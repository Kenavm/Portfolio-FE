import { useEffect, useState } from "react";
import PageDTO from "../../types/PageDTO";
import Skill from "../../types/Skill";
import { useParams } from "react-router-dom";
import fetchSkillEntries from "../../api/fetchSkillEntries";
import React from "react";
import Header from "../Header/Header";
import About from "../About/About";
import PortfolioList from "../PortfolioEntries/PortfolioList";
import SkillList from "../SkillList/SkillList";
import fetchPageDTO from "../../api/fetchPageDTO";


const PublicPage = ({}) => {
    const [skills, setSkills] = useState<Array<Skill>>([]);
    const [pageDTO, setPageDTO] = useState<PageDTO>();
    const { userId } = useParams();
  
    useEffect(() => {
      const loadSkills = async () => {
          const skills = await fetchSkillEntries();
          setSkills(skills);
      };
  
      loadSkills();
      loadPageDTO();
    
    }, []);

    const loadPageDTO = async () => {
      if (userId !== undefined) {
        const user = await fetchPageDTO(parseInt(userId));
        setPageDTO(user);
      }
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
                  loggedIn = {false}
                />
              )}
            </div>
          </div>
          <SkillList skills={skills} />
        </div>
      </div>
    );
}

export default PublicPage;