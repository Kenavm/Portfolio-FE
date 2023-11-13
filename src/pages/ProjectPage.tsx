import React from 'react';
import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchPortfolioEntries from "../api/fetchPortfolioEntries";
import fetchSkillEntries from "../api/fetchSkillEntries";
import Entry from '../types/Entry'
import Skill from '../types/Skill'
import SkillList from "../components/SkillList/SkillList";
import Header from '../components/Header/Header'
import fetchPublicUser from "../api/fetchPublicUser";
import PublicUser from "../types/PublicUser";
import About from "../components/About/About";

const ProjectPage = () => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [publicUser, setPublicUser] = useState<PublicUser>();

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
      console.log(data.aboutDescription)
      setPublicUser(data);
    };
    loadPublicUser();
  }, []);

  const onclickAddEntry = () => {
    console.log("test");
  }

  return (
    <div >
      <Header/>
      <div >
         <div>{publicUser && <About publicUser={publicUser}/>}</div>
         <div className="flex h-screen" >
          <div className="flex-grow overflow-y-auto mt-20"><PortfolioList entries={entries} onclickAddEntry={onclickAddEntry}/></div>
         </div>
      </div>
     
      <SkillList skills={skills} />
    </div>
  );
};

export default ProjectPage;
