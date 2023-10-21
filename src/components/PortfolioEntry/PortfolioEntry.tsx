import Entry from "../../types/Entry";
import "./PortfolioEntry.css";

interface PortfolioEntryProps {
  entry: Entry;
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry }) => {
  return (
      <div className="entry-container" key={entry.id}>
        <div className="start-and-end-date">
          <p>
            {entry.startDate}
          </p>
          <p>-</p>
          <p>{entry.endDate}</p>
        </div>
        <div className="entry-facts">
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
