import React, { createContext, useState } from "react";
import classes from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "components/LandingPage";
import SearchPage from "components/SearchPage";
import CitiesPage from "components/CitiesPage";
import Exception404Page from "components/Exception404Page";
import LoginPage from "components/LoginPage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

export const Auth = createContext({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});

function App() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  return (
    <Auth.Provider
      value={{
        isAuthorized,
        login: () => setIsAuthorized(true),
        logout: () => setIsAuthorized(false),
      }}
    >
      <div className={classes.app}>
        <header className={classes.header}>
          <ul className={classes.nav}>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/cities">Cities</Link>
            </li>
          </ul>
          <div>
            {isAuthorized && (
              <button onClick={() => setIsAuthorized(false)}>Sign out</button>
            )}
          </div>
        </header>

        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/search">
              <SearchPage />
            </PrivateRoute>
            <PrivateRoute exact path="/cities">
              <CitiesPage />
            </PrivateRoute>
            <Route path="*" component={Exception404Page} />
          </Switch>
        </div>
      </div>
    </Auth.Provider>
  );
}

export default App;
