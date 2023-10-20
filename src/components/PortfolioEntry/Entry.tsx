import PortfolioEntry from "../../types/PortfolioEntry";
import './Entry.css'

interface EntryProps {
  entry: PortfolioEntry;
}

const Entry: React.FC<EntryProps> = ({ entry }) => {
  const technologyNames = entry.technologies.map((technology) => technology);
  return (
    <div key={entry.id} className="entry">
      <p>
        {entry.startDate}-{entry.endDate}
      </p>
      <p>Role: {entry.role}</p>
      <p>Description: {entry.description}</p>
        <div>
          Technologies: {technologyNames.join(", ")}</div>
      <p>Repo: {entry.repoLink}</p>
    </div>
  );
};

export default Entry;
