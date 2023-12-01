import React from "react";
import { useState, useEffect } from "react";

import LoginForm from "../components/LoginForm/LoginForm";
import authenticateUser from "../api/authenticateUser";
import PrivateUser from "../types/PrivateUser";
import LoginResponse from "../types/LoginResponse";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [privateUser, setPrivateUser] = useState<PrivateUser>({
    id: 1,
    username: "",
    password: "",
  });
  const [loginResponse, setLoginResponse] = useState<LoginResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResponse && loginResponse.privateUserId !== undefined) {
      navigate(`/page/${loginResponse.privateUserId}`);
    }
  }, [loginResponse]); 

  const onClickSignIn = async () => {
    const user = await authenticateUser(privateUser);
    if (user.jwt !== "" || user.jwt !== undefined) {
      localStorage.setItem('jwtToken', user.jwt);
      setLoginResponse(user);
    }
  };

  return (
    <div className="place-items-center">
      {privateUser && (
        <LoginForm
          privateUser={privateUser}
          onChangeUsername={(event) =>
            setPrivateUser({ ...privateUser, username: event.target.value })
          }
          onChangePassword={(event) =>
            setPrivateUser({ ...privateUser, password: event.target.value })
          }
          onClickSignIn={onClickSignIn}
        />
      )}
    </div>
  );
};

export default LoginPage;
