import Entry from "../../types/Entry";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";


interface PortfolioEntriesProps {
  entries: Array<Entry>;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <PortfolioEntry entry={entry} key={entry.id} />
      ))}
    </div>
  );
};
export default PortfolioEntries;
