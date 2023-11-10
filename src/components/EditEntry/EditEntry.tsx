import DatePicker from "react-datepicker";
import Technology from "../../types/Technology";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import Entry from "../../types/Entry";
import { useState } from "react";

interface EditEntryProps {
  entry: Entry;
  onEditEntry: (updatedEntry: Entry) => void;
  technologies: Array<Technology>;
}

const EditEntry: React.FC<EditEntryProps> = ({
  entry,
  onEditEntry,
  technologies,
}) => {
  const [startDate, setStartDate] = useState<Date>(
    convertStringToDate(entry.startDate)
  );
  const [endDate, setEndDate] = useState<Date>(
    convertStringToDate(entry.endDate)
  );
  const [role, setRole] = useState<string>(entry.role);
  const [repoLink, setRepoLink] = useState<string>(entry.linkToRepos);
  const [description, setDescription] = useState<string>(entry.description);
  const [checkboxes, setCheckboxes] = useState<Array<boolean>>(
    technologies.map(() => false)
  );
  const [updatedTechnologies, setUpdatedTechnologies] = useState<
    Array<Technology>
  >([]);

  const handleCheckboxChange = (
    index: number,
    technology: string,
    checked: boolean
  ) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    const tech = convertStringToEnum(technology);
    if (!checked) {
      setUpdatedTechnologies([...updatedTechnologies, tech]);
    } else {
      setUpdatedTechnologies((prevTechnologies) =>
        prevTechnologies.filter((t) => t !== tech)
      );
    }

    setCheckboxes(newCheckboxes);
  };

  function convertStringToEnum(technology: string) {
    return Technology[technology];
  }

  function convertStringToDate(date: string) {
    return new Date(date);
  }

  convertDateToString(endDate);
  function convertDateToString(date: Date) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
  }

  const onSubmitEntry = () => {
    const updatedEntry: Entry = {
      id: entry.id,
      userId: entry.userId,
      startDate: convertDateToString(startDate),
      endDate: convertDateToString(endDate),
      description: description,
      technologies: updatedTechnologies,
      role: role,
      linkToRepos: repoLink,
    };

    return onEditEntry(updatedEntry);
  };

  return (
    <form className="edit-entry-form" onSubmit={onSubmitEntry}>
      <div className="start-date-container">
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null | undefined) =>
            date && setStartDate(date)
          }
        />
      </div>
      <div className="end-date-container">
        End Date:
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null | undefined) => date && setEndDate(date)}
        />
      </div>
      <div className="role-input-field">
        <label>
          Role:
          <input
            type="text"
            value={role}
            placeholder="Insert the role"
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
      </div>
      <div className="repoLink-input-field">
        <label>
          Repository Link:
          <input
            type="text"
            value={repoLink}
            placeholder="Insert the repository link"
            onChange={(e) => setRepoLink(e.target.value)}
          />
        </label>
      </div>
      <div className="description">
        <label>
          Description:
          <textarea
            value={description}
            placeholder="Insert the repository link"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="checkbox-technologies">
        {technologies.map((technology, index) => (
          <div key={technology.id}>
            <label>
              {Technology[technology.technology]}
              <input
                type="checkbox"
                checked={checkboxes[index]}
                onChange={() =>
                  handleCheckboxChange(
                    index,
                    Technology[technology.technology],
                    checkboxes[index]
                  )
                }
              />
            </label>
          </div>
        ))}
      </div>
      <Button buttonText="Edit entry" />
      <Button buttonText="Cancel" />
    </form>
  );
};

export default EditEntry;