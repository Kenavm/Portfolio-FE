import DatePicker from "react-datepicker";
import Technology from "../../types/Technology";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";

interface AddEntryProps {
  onSubmitEntry: () => void;
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  roleValue: string;
  onChangeRole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repoLink: string;
  technologiesArray: { id: number; technology: Technology; isChecked: boolean }[];
  onChangeLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChecked: (id: number) => void;
}

const AddEntry: React.FC<AddEntryProps> = ({
  onSubmitEntry,
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  roleValue,
  onChangeRole,
  repoLink,
  onChangeLink,
  technologiesArray,
  onChecked
}) => {

  return (
    <div className="add_entry_container">
      <div className="start_date_container">
        Start Date:
        <DatePicker selected={startDate} onChange={onChangeStartDate} />
      </div>
      <div className="end_date_container">
        End Date:
        <DatePicker selected={endDate} onChange={onChangeEndDate} />
      </div>
      <div className="role_input_field">
        <input
          type={"text"}
          value={roleValue}
          placeholder={"Insert the role"}
          onChange={onChangeRole}
        />
      </div>
      <div className="repoLink_input_field">
        <input
          type={"text"}
          value={repoLink}
          placeholder={"Insert the repository link"}
          onChange={onChangeLink}
        />
      </div>
      <div className="checkbox_technologies">
        {technologiesArray.map((technology) => (
          <div key={technology.id}>
            <p>{technology.technology}</p>
            <input
              type="checkbox"
              defaultChecked={technology.isChecked}
              onChange={() => onChecked(technology.id)}
            />
          </div>
        ))}
      </div>
      <Button onClick={onSubmitEntry} buttonText="Submit new entry" />
    </div>
  );
};

export default AddEntry;
