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
  const [checkboxes, setCheckboxes] = useState<Array<boolean>>(
    technologies.map((tech) => entry.technologies.includes(tech.technology))
  );
  const [updatedTechnologies, setUpdatedTechnologies] = useState<
    Array<Technology>
  >(
    technologies.filter((tech) => entry.technologies.includes(tech.technology))
  );

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
  console.log(updatedTechnologies);

  const onSubmitEntry = () => {
    console.log(updatedTechnologies);
    const updatedEntry: Entry = {
      id: entry.id,
      userId: entry.userId,
      startDate: convertDateToString(startDate),
      endDate: convertDateToString(endDate),
      description: description,
      technologies: updatedTechnologies.map((tech) => tech.technology),
      role: role,
      repoLink: repoLink,
    };
    console.log(updatedEntry.technologies);
    onEditEntry(updatedEntry);
  };

  function convertStringToEnum(technology: string) {
    return technologies.find((tech) => tech.technology === technology);
  }

  function convertStringToDate(date: string) {
    return new Date(date);
  }

  convertDateToString(endDate);
  function convertDateToString(date: Date) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
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
            placeholder="Insert the repository link"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="checkbox-technologies">
        {technologies.map((technology, index) => (
          <div key={index}>
            <label>
              {technology.technology}
              <input
                type="checkbox"
                checked={checkboxes[index]}
                onChange={() =>
                  handleCheckboxChange(
                    index,
                    technology.technology,
                    checkboxes[index]
                  )
                }
              />
            </label>
          </div>
        ))}
      </div>
      <Button buttonText="Edit entry" />
      <Button onClick={cancel} buttonText="Cancel" />
    </form>
  );
};

export default EditEntry;
