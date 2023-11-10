import Entry from "../../types/Entry";
import "./PortfolioEntry.css";
import Button from "../Button/Button";
interface PortfolioEntryProps {
  entry: Entry;
  onDisplayModal: (id:number) => void;
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry, onDisplayModal }) => {
  return (
      <div className="entry-container" key={entry.id}>
        <div className="start-and-end-date">
          <p>
            {entry.startDate.toString()}
          </p>
          <p>-</p>
          <p>{entry.endDate.toString()}</p>
        </div>
        <div className="entry-facts">
          <Button onClick={() => onDisplayModal(entry.id)} buttonText="Edit"/>
          <p className="entry-role">{entry.role}</p>
          <p className="entry-description">{entry.description}</p>
          <div className="entry-technologies">
            {entry.technologies.map((technology: string) => (
              <p className="technology">{technology}</p>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PortfolioEntry;
