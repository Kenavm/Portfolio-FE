import React, { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
  }

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="border-2 border-black rounded-2xl bg-[#EAEAEA] p-8 add_entry_container max-w-md z-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;
