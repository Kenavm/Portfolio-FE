import React from "react";
import PrivateUser from "../../types/PrivateUser";
import Button from "../Button/Button";
import Header from "../Header/Header";

interface LoginFormProps {
  privateUser: PrivateUser;
  onChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSignIn: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  privateUser,
  onChangeUsername,
  onChangePassword,
  onClickSignIn,
}) => {
  return (
    <div className="place-items-center">
      
      <div className="absolute left-0 top-0">
        <Header/>
  
      </div>
    <div className="border border-black rounded-3xl drop-shadow-md bg-[#EAEAEA]">
      <div className="m-4">
        <p className="font-bold text-[#FF2E63]">Username: </p>
        <input className="bg-[#FAF9F6]" value={privateUser.username} onChange={onChangeUsername}></input>
      </div>
      <div className="m-4">
        <p className="font-bold text-[#FF2E63]">Password: </p>
        <input className="bg-[#FAF9F6]" type="password" value={privateUser.password} onChange={onChangePassword}></input>
      </div>
      <div className="m-4">
        <Button
        onClick={onClickSignIn}
        buttonText="Sign in"
        className="sign_in_button font-bold text-[#FF2E63] "
      />
    </div>
    </div>
    
    </div>
  );
};

export default LoginForm;
