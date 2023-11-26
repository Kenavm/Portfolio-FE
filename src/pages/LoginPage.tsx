import React from "react";
import { useState, useEffect } from "react";

import LoginForm from "../components/LoginForm/LoginForm";
import fetchToken from "../api/fetchToken";

const LoginPage = () => {
  const [privateUser, setPrivateUser] = useState({
    username: "",
    password: "",
  });

  const [loginResponse, setLoginResponse] = useState({
    username: "",
    privateUserId: 0,
    jwt: "",
  });

  const onClickSignIn = async () => {
    const user = await fetchToken(privateUser);
    if (user.jwt != "") {
      setLoginResponse(user);
    }
  };

  useEffect(() => {
    console.log(loginResponse);
  }, [loginResponse]);

  return (
    <div>
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
    </div>
  );
};

export default LoginPage;
