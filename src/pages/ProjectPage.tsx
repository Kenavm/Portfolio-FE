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

const ProjectPage = () => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [publicUser, setPublicUser] = useState<PublicUser>();
  const [displayModal, setDisplayModal] = useState(false);

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

  const onclickAddEntry = () => {
    console.log("test");
  };

  const editEntry = (id: number, updatedEntry: Entry) => {
    const updateEntry = entries.find((entry) => (entry.id = id));
  };

  const openModal = () => {
    setDisplayModal(!displayModal);
  }

  return (
    <div>
      <Header />
      {publicUser && <About publicUser={publicUser} />}
      <PortfolioList
        entries={entries}
        onclickAddEntry={onclickAddEntry}
        onDisplayModal={(() => openModal())}
      />
      <SkillList skills={skills} />
    </div>
  );
};

export default ProjectPage;
