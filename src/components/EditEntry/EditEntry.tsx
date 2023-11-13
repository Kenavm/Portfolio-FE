import DatePicker from "react-datepicker";
import Teeh from "../../types/Technology";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import Entry from "../../types/Entry";
import { useState } from "react";

interface EditEntryProps {
  entry: Entry;
  onEditEntry: (updatedEntry: Entry) => void;
  technologies: {
    id: number;
    technology: Teeh;
    isChecked: boolean;
  }[];
  cancel: (id: number) => void;
}

const EditEntry: React.FC<EditEntryProps> = ({
  entry,
  onEditEntry,
  technologies,
  cancel,
}) => {
  const [startDate, setStartDate] = useState<Date>(
    convertStringToDate(entry.startDate)
  );
  const [endDate, setEndDate] = useState<Date>(
    convertStringToDate(entry.endDate)
  );
  const [role, setRole] = useState<string>(entry.role);
  const [repoLink, setRepoLink] = useState<string>(entry.repoLink);
  const [description, setDescription] = useState<string>(entry.description);
  const [updatedTechnologies, setUpdatedTechnologies] = useState(
    setStartingCheckboxState()
  );

  function setStartingCheckboxState() {
    return technologies.map((tech) => {
      if (entry.technologies.includes(tech.technology)) {
        return { ...tech, isChecked: true };
      } else {
        return { ...tech };
      }
    });
  }

  const handleCheckboxChange = (id: number) => {
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

  const onSubmitEntry = () => {
    const knownTechnologies = convertTechnologiesToString();
    const updatedEntry: Entry = {
      id: entry.id,
      userId: entry.userId,
      startDate: convertDateToString(startDate),
      endDate: convertDateToString(endDate),
      description: description,
      technologies: knownTechnologies,
      role: role,
      repoLink: repoLink,
    };

    onEditEntry(updatedEntry);
  };

  function convertTechnologiesToString() {
    return updatedTechnologies
      .filter((tech) => tech.isChecked === true)
      .map((tech) => tech.technology);
  }

  function convertStringToDate(date: string) {
    return new Date(date);
  }

  function convertDateToString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

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
            placeholder="description...."
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="checkbox-technologies">
        {updatedTechnologies.map((technology) => (
          <div key={technology.technology}>
            <label>
              {technology.technology}
              <input
                type="checkbox"
                checked={technology.isChecked}
                onChange={() => handleCheckboxChange(technology.id)}
              />
            </label>
          </div>
        ))}
      </div>
      <Button buttonText="Edit entry" />
      <Button onClick={() => cancel} buttonText="Cancel" />
    </form>
  );
};

export default EditEntry;
