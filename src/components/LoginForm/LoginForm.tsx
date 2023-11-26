import React from 'react';
import PrivateUser from "../../types/PrivateUser";
import Button from "../Button/Button";

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
    <div>
      <div>
        <p>Username: </p>
        <input value={privateUser.username} onChange={onChangeUsername}></input>
      </div>
      <div>
        <p>Password: </p>
        <input value={privateUser.password} onChange={onChangePassword}></input>
      </div>
      <Button
        onClick={onClickSignIn}
        buttonText="Sign in"
        className="sign_in_button"
      />
    </div>
  );
};

export default LoginForm;
