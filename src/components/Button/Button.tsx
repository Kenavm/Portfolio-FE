import React from "react";

interface NewButtonProps {
  className?: string;
  onClick?: () => void;
  buttonText?: string;
}

const Button: React.FC<NewButtonProps> = ({ onClick, buttonText, className }) => {
  return (
    <div className={className}>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};
export default Button;
