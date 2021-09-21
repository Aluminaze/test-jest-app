import React, { useContext } from "react";
import { Auth } from "components/App/App";
import { Redirect, Route } from "react-router";

const PrivateRoute = (props: any): JSX.Element => {
  const { children, ...rest } = props;
  const { isAuthorized } = useContext(Auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthorized) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
