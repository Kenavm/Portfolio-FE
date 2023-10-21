import { useEffect, useState } from "react";
import PortfolioEntries from "../components/PortfolioEntries/PortfolioEntries";
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
      <PortfolioEntries entries={entries} />
    </div>
  );
};

export default ProjectPage;
