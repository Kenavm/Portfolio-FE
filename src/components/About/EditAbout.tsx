import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

interface EditAboutProps {
  description: string;
  onEditAbout: (editedDescription: string) => void;
}

const EditAbout: React.FC<EditAboutProps> = ({ description, onEditAbout }) => {
  const [editedDescription, setEditedDescription] =
    useState<string>(description);

  return (
    <Modal>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />

      <Button
        onClick={() => onEditAbout(editedDescription)}
        buttonText="Submit"
      ></Button>
    </Modal>
  );
};

export default EditAbout;
