import "./PortfolioEntry.css";

interface PortfolioEntryProps {
  entry: {
    id: number;
    userID: number;
    startDate: string;
    endDate: string;
    role: string;
    description: string;
    technologies: string[];
    link: string;
  };
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry }) => {
  return (
    <div>
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
              <p>{technology}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEntry;
