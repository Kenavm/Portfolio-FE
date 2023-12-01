import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

interface EditAboutProps {
  description: string;
  onEditAbout: (editedDescription: string) => void;
  onDisplayAboutModal: (id?: number, about?: boolean) => void;
}

const EditAbout: React.FC<EditAboutProps> = ({
  description,
  onEditAbout,
  onDisplayAboutModal,
}) => {
  const [editedDescription, setEditedDescription] =
    useState<string>(description);

  useEffect(() => {
    const textarea = document.getElementById("aboutTextarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [editedDescription]);

  return (
    <Modal>
      <textarea
        id="aboutTextarea"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="description flex items-center justify-center"
      />

      <Button
        onClick={() => onEditAbout(editedDescription)}
        buttonText="Submit"
      />
      <Button
        onClick={() => onDisplayAboutModal(undefined, false)}
        buttonText="Cancel"
      />
    </Modal>
  );
};

export default EditAbout;
