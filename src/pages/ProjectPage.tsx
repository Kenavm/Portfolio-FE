import { useState, useEffect } from "react";
import PortfolioEntries from "../components/PortfolioEntries/PortfolioEntries";
import PortfolioEntry from "../types/PortfolioEntry";
import fetchPortfolioEntries from "../api/fetchPortfolio";

const ProjectPage = () => {

  const [entries, setEntries] = useState<Array<PortfolioEntry>>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const entries = await fetchPortfolioEntries();
      console.log(entries)
      setEntries(entries);
    } catch (error) {
      console.error("Error loading notes data:", error);
    }
  };

  return <div>
    <PortfolioEntries entries={entries}/>
  </div>;
};

export default ProjectPage;
