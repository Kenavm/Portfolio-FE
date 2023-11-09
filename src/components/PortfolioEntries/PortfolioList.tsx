import Entry from "../../types/Entry";
import Button from "../Button/Button";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";

interface PortfolioEntriesProps {
  entries: Array<Entry>;
  onclickAddEntry : () => void;
  onDisplayModal: () => void;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries, onclickAddEntry, onDisplayModal }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <PortfolioEntry key={entry.id} entry={entry} onDisplayModal={onDisplayModal}/>
      ))}
      <Button onClick={onclickAddEntry} buttonText={"Add entry"}/>
    </div>
  );
};
export default PortfolioEntries;
