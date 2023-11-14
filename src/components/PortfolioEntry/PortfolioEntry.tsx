import React from 'react';
import Entry from "../../types/Entry";
//import "./PortfolioEntry.css";
import Button from "../Button/Button";import "../../css/style.css"

interface PortfolioEntryProps {
  entry: Entry;
  onDisplayEditModal: (id:number) => void;
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry, onDisplayEditModal: onDisplayModal }) => {
  return (
      <div className="entry-container flex border-1 border-solid border-black rounded-3xl p-2.5 text-center m-4 bg-[#EAEAEA] drop-shadow-md " key={entry.id}>
        <div className="start-and-end-date p-5 border-r border-solid border-r-black">
          <p>
            {entry.startDate.toString()}
          </p>
          <p>-</p>
          <p>{entry.endDate.toString()}</p>
        </div>
        <div className="entry-facts flex flex-1 flex-col justify-center max-w-md">
          <Button className= {"flex justify-end"} onClick={() => onDisplayModal(entry.id)} buttonText="Edit"/>
          <p className="entry-role font-bold text-[#FF2E63]">{entry.role}</p>
          <p className="entry-description text-center whitespace-pre-wrap break-words ml-2">{entry.description}</p>
          <div className="entry-technologies flex justify-center flex-wrap p-2.5 text-[#FF2E63]">
            {entry.technologies.map((technology: string, index) => (
              <p key= {entry.technologies[index]}className="technology border-solid border-1">{technology}</p>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PortfolioEntry;
