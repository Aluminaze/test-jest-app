import React, { useEffect, useState } from "react";
import classes from "./App.module.css";

import { Switch, Route, Link } from "react-router-dom";
import Landing from "components/LandingPage";
import SearchPage from "components/SearchPage";
import CitiesPage from "components/CitiesPage";
import Exception404Page from "components/Exception404Page";

function getUserData() {
  return Promise.resolve(() => ({ id: 0, name: "User" }));
}

function App() {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
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
        <div>{userData && <span>User: {userData?.name}</span>}</div>
      </header>

      <div className={classes.content}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/cities" component={CitiesPage} />
          <Route path="*" component={Exception404Page} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
