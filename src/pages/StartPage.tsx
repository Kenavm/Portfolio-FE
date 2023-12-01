import React from "react";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const onClickLoginPage = () => {
    navigate(`/login`);
  };
  return (
    <div>
      <Header />
      <Button
        onClick={onClickLoginPage}
        buttonText="login"
        className="m-1 border border-gray-400 px-2 py-1 rounded bg-[#EAEAEA] text-[#FF2E63] drop-shadow-md"
      />
      <div className="flex">
        <Button onClick={() => navigate("/public/1")} buttonText="Theresa" className="m-1 border border-gray-400 px-2 py-1 rounded bg-[#EAEAEA] text-[#FF2E63] drop-shadow-md"/>
        <Button onClick={() => navigate("/public/2")} buttonText="Manuel" className="m-1 border border-gray-400 px-2 py-1 rounded bg-[#EAEAEA] text-[#FF2E63] drop-shadow-md"/>
        <Button onClick={() => navigate("/public/3")} buttonText="Melina" className="m-1 border border-gray-400 px-2 py-1 rounded bg-[#EAEAEA] text-[#FF2E63] drop-shadow-md"/>
      </div>
    </div>
  );
};

export default StartPage;
