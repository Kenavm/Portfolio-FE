import DatePicker from "react-datepicker";
import Technology from "../../types/Technology";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import Entry from "../../types/Entry";
import { useState } from "react";

interface EditEntryProps {
  entry: Entry;
  onEditEntry: (updatedEntry:Entry) => void;
}

const EditEntry: React.FC<EditEntryProps> = ({entry}) => {

  const [startDate, setStartDate] = useState<Date>(entry.startDate);
  const [endDate, setEndDate] = useState<Date>(entry.endDate);
  const [role, setRole] = useState<string>(entry.role);
  const [repoLink, setRepoLink] = useState<string>(entry.linkToRepos);
  const [description, setDescription] = useState<string>(entry.description);
  const [checkboxes, setCheckboxes] = useState<Array<boolean>>();

  const handleCheckboxChange = (index:number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  
  const onSubmitEntry = () => {
    const updatedEntry:Entry = {
      id: entry.id,
      userId: entry.userId,
      startDate: startDate,
      endDate: endDate,
      description: description,
    //  technologies: checkboxes,
      role: role,
    //  linkToRepo: repoLink
    }
  }

  return (
    <form className="edit-entry-form" onSubmit={onSubmitEntry}>
      <div className="start-date-container">
        Start Date:
        <DatePicker selected={startDate} onChange={(date: Date | null | undefined) => date && setStartDate(date)} />
      </div>
      <div className="end-date-container">
        End Date:                                                                                                      
        <DatePicker selected={endDate} onChange={(date: Date | null | undefined) => date && setEndDate(date)} />
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
          Description
          <input
            type="textarea"
            value={description}
            placeholder="Insert the repository link"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="checkbox-technologies">
        {entry.technologies.map((technology, index) => (
          <div key={technology}>
            <label>
              {technology}
              <input
                type="checkbox"
                checked={true}
                onChange={() => handleCheckboxChange(index)}
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
