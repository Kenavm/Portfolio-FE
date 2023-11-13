import React from 'react';
import Entry from "../../types/Entry";
//import "./PortfolioEntry.css";
import "../../css/style.css"

interface PortfolioEntryProps {
  entry: Entry;
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry }) => {
  return (
      <div className="entry-container flex border-1 border-solid border-black rounded-3xl p-2.5 text-center m-4 bg-[#EAEAEA] drop-shadow-md " key={entry.id}>
        <div className="start-and-end-date p-5 border-r border-solid border-r-black">
          <p>
            {entry.startDate}
          </p>
          <p>-</p>
          <p>{entry.endDate}</p>
        </div>
        <div className="entry-facts flex flex-1 flex-col justify-center max-w-md">
          <p className="entry-role font-bold text-[#FF2E63]">{entry.role}</p>
          <p className="entry-description text-center whitespace-pre-wrap break-words ml-2">{entry.description}</p>
          <div className="entry-technologies flex justify-center flex-wrap p-2.5">
            {entry.technologies.map((technology: string) => (
              <p className="technology border-solid border-1">{technology}</p>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PortfolioEntry;
