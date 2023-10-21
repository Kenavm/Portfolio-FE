import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";

interface PortfolioEntriesProps {
  entries: Array<{
    id: number;
    userID: number;
    startDate: string;
    endDate: string;
    role: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
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
