import React from 'react';
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const onClickLoginPage = () => {
    navigate(`/login`);
  };
  return (
    <div>
      <Button
        onClick={onClickLoginPage}
        buttonText="login"
        className="login_button"
      />
      <div className= "portfolios">
          Add button with portfolios here
      </div>
    </div>
  );
};

export default StartPage;
