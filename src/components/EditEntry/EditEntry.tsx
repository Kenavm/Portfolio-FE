import DatePicker from "react-datepicker";
import Technology from "../../types/Technology";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import Entry from "../../types/Entry";
import { useState } from "react";

interface TechnologyCheckbox {
  id: number;
  technology: Technology;
  isChecked: boolean;
}

interface EditEntryProps {
  entry: Entry;
  onEditEntry: (updatedEntry: Entry) => void;
  technologies: TechnologyCheckbox[];
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
    return technologies.map((tech) => ({
      ...tech,
      isChecked: entry.technologies.includes(tech.technology),
    }));
  }

  const handleCheckboxChange = (id: number) => {
    setUpdatedTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) =>
        technology.id === id
          ? { ...technology, isChecked: !technology.isChecked }
          : technology
      )
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
      .filter((tech) => tech.isChecked)
      .map((tech) => tech.technology);
  }

  function convertStringToDate(date: string) {
    return new Date(date);
  }

  function convertDateToString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  return (
    <form className="border-2 border-black rounded-2xl bg-[#EAEAEA] edit-entry-form" onSubmit={onSubmitEntry}>
      <div className="start-date-container">
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null | undefined) =>
            date && setStartDate(date)
          }
          className="bg-[#EAEAEA] border border-black m-4"
        />
      </div>
      <div className="end-date-container">
        End Date:
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null | undefined) => date && setEndDate(date)}
          className="bg-[#EAEAEA] border border-black m-4"
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
            className="bg-[#EAEAEA] border border-black m-4"
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
            className="bg-[#EAEAEA] border border-black m-4"
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
            className="bg-[#EAEAEA] border border-black m-4"
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="checkbox-technologies">
        {updatedTechnologies.map((technology) => (
          <div key={technology.technology} className="flex items-center mb-2">
            <label className="mr-2">
              {technology.technology}
              <input
                type="checkbox"
                checked={technology.isChecked}
                onChange={() => handleCheckboxChange(technology.id)}
                className="mr-2 bg-[#FF2E63]"
              />
            </label>
          </div>
        ))}
      </div>
      </div>
      
      <Button buttonText="Edit entry" />
      <Button onClick={() => cancel} buttonText="Cancel" />
    </form>
  );
};

export default EditEntry;
