import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useState } from "react";
import Entry from "../../types/Entry";
import React from "react";
import Modal from "../Modal/Modal";
import Technology from "../../types/Technology";

interface AddEntryProps {
  technologies: {
    id: number;
    technology: Technology;
    isChecked: boolean;
  }[];
  userId: number;
  onAddEntry: (newEntry: Entry) => void;
  cancel: () => void;
}

const AddEntry: React.FC<AddEntryProps> = ({
  technologies,
  userId,
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
  role.length > 0 &&
  repoLink.length > 0 &&
  description.length > 0 &&
  new Date(startDate) <= new Date(endDate);


  const onSubmitEntry = () => {
    const startDateFormat = convertDateToString(startDate);
    const endDateFormat = convertDateToString(endDate);
    const filteredTechnologies = filterTechnologies();

    const newEntry: Entry = {
      id: 0,
      privateUserId: userId,
      startDate: startDateFormat,
      endDate: endDateFormat,
      description: description,
      technologies: filteredTechnologies,
      role: role,
      repoLink: repoLink,
    };
    onAddEntry(newEntry);
  };
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
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
    <Modal>
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
            placeholder="Insert role"
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
            placeholder="Insert repository link"
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
            placeholder="Description...."
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#EAEAEA] border border-black m-4"
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="checkbox_technologies">
          {technologies.map((technology) => (
            <div key={technology.id} className="flex items-center mb-2">
              <p className="mr-2">{technology.technology.replace("_", " ")}</p>
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
        className={validation ? "visible" : "invisible"}
        onClick={onSubmitEntry}
        buttonText="Submit new entry"
      />
      <Button onClick={() => cancel()} buttonText="Cancel" />
    </Modal>
  );
};

export default AddEntry;
