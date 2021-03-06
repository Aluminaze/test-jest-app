import React, { createContext, useState } from "react";
import classes from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "components/LandingPage";
import SearchPage from "components/SearchPage";
import CitiesPage from "components/CitiesPage";
import Exception404Page from "components/Exception404Page";
import LoginPage from "components/LoginPage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import QueryPage from "components/QueryPage";
import TodoPage from "components/TodoPage";
import { TablePage } from "components/TablePage";
import { InfinityScrollPage } from "components/InfinityScrollPage";

export const Auth = createContext({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});

function App() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

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
            <li>
              <Link to="/query">Query</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/infinity-scroll">Infinity Scroll</Link>
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
            <PrivateRoute exact path="/table">
              <TablePage />
            </PrivateRoute>
            <PrivateRoute exact path="/infinity-scroll">
              <InfinityScrollPage />
            </PrivateRoute>
            <PrivateRoute exact path="/search">
              <SearchPage />
            </PrivateRoute>
            <PrivateRoute exact path="/cities">
              <CitiesPage />
            </PrivateRoute>
            <PrivateRoute exact path="/query">
              <QueryPage />
            </PrivateRoute>
            <PrivateRoute exact path="/todo">
              <TodoPage />
            </PrivateRoute>
            <Route path="*" component={Exception404Page} />
          </Switch>
        </div>
      </div>
    </Auth.Provider>
  );
}

export default App;
