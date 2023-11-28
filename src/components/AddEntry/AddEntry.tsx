import DatePicker from "react-datepicker";
import Teeh from "../../types/Technology";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useState } from "react";
import Entry from "../../types/Entry";
import React from "react";

interface AddEntryProps {
  technologies: {
    id: number;
    technology: Teeh;
    isChecked: boolean;
  }[];
  onAddEntry: (newEntry: Entry) => void;
  cancel: () => void;
}

const AddEntry: React.FC<AddEntryProps> = ({
  technologies,
  cancel,
  onAddEntry,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [role, setRole] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [description, setDescription] = useState("");
  const [updatedTechnologies, setUpdatedTechnologies] = useState(technologies);
  const validation =
    role.length > 0 && repoLink.length > 0 && description.length > 0;

  const onSubmitEntry = () => {
    const startDateFormat = convertDateToString(startDate);
    const endDateFormat = convertDateToString(endDate);
    const filteredTechnologies = filterTechnologies();

    const newEntry: Entry = {
      id: 0,
      userId: 1,
      startDate: startDateFormat,
      endDate: endDateFormat,
      description: description,
      technologies: filteredTechnologies,
      role: role,
      repoLink: repoLink,
    };
    onAddEntry(newEntry);
  };

  function filterTechnologies() {
    return updatedTechnologies
      .filter((t) => t.isChecked)
      .map((t) => t.technology);
  }

  function convertDateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const onCheckedTechnology = (id: number) => {
    setUpdatedTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) =>
        technology.id === id
          ? { ...technology, isChecked: !technology.isChecked }
          : technology
      )
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="border-2 border-black rounded-2xl bg-[#EAEAEA] p-8 add_entry_container max-w-md z-10">
        <div className="start_date_container">
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className="bg-[#EAEAEA] border border-black m-4"
          />
        </div>
        <div className="end_date_container">
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            className="bg-[#EAEAEA] border border-black m-4"
          />
        </div>
        <div className="role_input_field">
          <label>
            Role:
            <input
              type="text"
              value={role}
              placeholder="Insert the role"
              onChange={(e) => setRole(e.target.value)}
              className="bg-[#EAEAEA] border border-black m-4"
            />
          </label>
        </div>
        <div className="repoLink_input_field">
          <label>
            Repository Link:
            <input
              type="text"
              value={repoLink}
              placeholder="Insert the repository link"
              onChange={(e) => setRepoLink(e.target.value)}
              className="bg-[#EAEAEA] border border-black m-4"
            />
          </label>
        </div>
        <div className="description flex items-center justify-center">
          <label>
            Description:
            <textarea
              value={description}
              placeholder="description...."
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#EAEAEA] border border-black m-4"
            />
          </label>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="checkbox_technologies">
            {technologies.map((technology) => (
              <div key={technology.id} className="flex items-center mb-2">
                <p className="mr-2">{technology.technology}</p>
                <input
                  type="checkbox"
                  defaultChecked={technology.isChecked}
                  onChange={() => onCheckedTechnology(technology.id)}
                  className="mr-2 bg-[#FF2E63]"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          className={validation ? "visible" : "invisible"} // Use Tailwind classes for visibility
          onClick={onSubmitEntry}
          buttonText="Submit new entry"
        />
        <Button onClick={() => cancel()} buttonText="Cancel" />
      </div>
    </div>
  );
};

export default AddEntry;
