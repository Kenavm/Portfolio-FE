import { useEffect, useState } from "react";
import PortfolioList from "../components/PortfolioEntries/PortfolioList";
import fetchPortfolioEntries from "../api/fetchPortfolioEntries";

const ProjectPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadPortfolioEntries = async () => {
      const data = await fetchPortfolioEntries();
      setEntries(data);
    };
    loadPortfolioEntries();
  }, []);

  return (
    <div>
      <PortfolioList entries={entries} />
    </div>
  );
};

export default ProjectPage;
