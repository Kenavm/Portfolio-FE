interface NewButtonProps {
  onClick?: () => void;
  buttonText?: string;
}

const Button: React.FC<NewButtonProps> = ({ onClick, buttonText }) => {
  return (
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};
export default Button;
