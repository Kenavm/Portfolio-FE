import DatePicker from "react-datepicker";
import Technology from "../../types/Technology";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useState } from "react";
import Entry from "../../types/Entry";

interface AddEntryProps {
  technologies: {
    id: number;
    technology: Technology;
    isChecked: boolean;
  }[];
  onAddEntry: (newEntry: Entry) => void;
  cancel: () => void;
}

const AddEntry: React.FC<AddEntryProps> = ({ technologies, cancel, onAddEntry }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [role, setRole] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [description, setDescription] = useState("");
  const [updatedTechnologies, setUpdatedTechnologies] = useState(technologies)


  const onSubmitEntry = () => {
    const startDateFormat =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    const endDateFormat =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();

    const filteredTechnologies = updatedTechnologies
      .filter((t) => t.isChecked)
      .map((t) => t.technology);

    const newEntry = {
      id: 0,
      userId: 1,
      startDate: startDateFormat,
      endDate: endDateFormat,
      description: description,
      technologies: filteredTechnologies,
      role: role,
      repoLink: repoLink,
    };
    onAddEntry(newEntry)
  };

  const onCheckedTechnology = (id: number) => {
    console.log(id);
    setUpdatedTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) => {
        if (technology.id === id) {
          const technologyCheck = technology.isChecked;
          return { ...technology, isChecked: !technologyCheck };
        } else {
          return { ...technology };
        }
      })
    );
  };

  return (
    <div className="add_entry_container">
      <div className="start_date_container">
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      <div className="end_date_container">
        End Date:
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
      <div className="role_input_field">
        <label>
          Role:
          <input
            type={"text"}
            value={role}
            placeholder={"Insert the role"}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
      </div>
      <div className="repoLink_input_field">
        <label>
          Repository Link:
          <input
            type={"text"}
            value={repoLink}
            placeholder={"Insert the repository link"}
            onChange={(e) => setRepoLink(e.target.value)}
          />
        </label>
      </div>
      <div className="description">
        <label>
          Description:
          <textarea
            value={description}
            placeholder="description...."
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="checkbox_technologies">
        {technologies.map((technology) => (
          <div key={technology.id}>
            <p>{technology.technology}</p>
            <input
              type="checkbox"
              defaultChecked={technology.isChecked}
              onChange={() => onCheckedTechnology(technology.id)}
            />
          </div>
        ))}
      </div>
      <Button onClick={onSubmitEntry} buttonText="Submit new entry" />
      <Button onClick={() => cancel()} buttonText="Cancel" />
    </div>
  );
};

export default AddEntry;
