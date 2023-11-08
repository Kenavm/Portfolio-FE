interface NewButtonProps {
  onclick: () => void;
  buttonText: string;
}

const Button: React.FC<NewButtonProps> = ({ onclick, buttonText }) => {
  return (
    <div>
      <button onClick={onclick}>{buttonText}</button>
    </div>
  );
};
export default Button;
