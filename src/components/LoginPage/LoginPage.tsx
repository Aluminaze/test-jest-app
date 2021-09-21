import { Auth } from "components/App/App";
import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginPage = () => {
  const { isAuthorized, login } = useContext(Auth);
  const { state } = useLocation<LocationState>();

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div>
      <div>Login page</div>
      <button onClick={() => login()}>Sign in</button>
    </div>
  );
};

export default LoginPage;
