import Entry from "../../types/Entry";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";


interface PortfolioEntriesProps {
  entries: Array<Entry>;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <PortfolioEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};
export default PortfolioEntries;
