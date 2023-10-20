import React from 'react';
import PortfolioEntry from '../../types/PortfolioEntry';
import Entry from '../PortfolioEntry/Entry';

interface PortfolioEntriesProps {
  entries: Array<PortfolioEntry>;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PortfolioEntries;
