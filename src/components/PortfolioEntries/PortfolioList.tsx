import Entry from "../../types/Entry";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";

interface PortfolioEntriesProps {
  entries: Array<Entry>;
  onclickAddEntry : () => void;
  onDisplayModal: (id: number) => void;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries, onclickAddEntry, onDisplayModal }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <PortfolioEntry key={entry.id} entry={entry} onDisplayModal={onDisplayModal}/>
      ))}
    </div>
  );
};
export default PortfolioEntries;
