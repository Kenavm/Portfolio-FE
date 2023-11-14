import React from 'react';
import Entry from "../../types/Entry";
import Button from "../Button/Button";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";

interface PortfolioEntriesProps {
  entries: Array<Entry>;
  onDisplayEditModal: (id: number) => void;
  onDisplayAddModal: () => void;
}

const PortfolioEntries: React.FC<PortfolioEntriesProps> = ({ entries, onDisplayEditModal, onDisplayAddModal }) => {
  return (
    <div className="portfolio-entries">
      {entries.map((entry) => (
        <PortfolioEntry key={entry.id} entry={entry} onDisplayEditModal={onDisplayEditModal}/>
      ))}
       <Button onClick= {() => onDisplayAddModal()} buttonText = {"Add entry"}/>
    </div>
  );
};
export default PortfolioEntries;
