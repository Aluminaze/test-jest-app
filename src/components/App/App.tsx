import React from "react";
import classes from "./App.module.css";
import List from "components/List";
import { listData } from "TestData/ListData";

function App() {
  return (
    <div className={classes.app}>
      <header className={classes.header}>Test Application</header>
      <div className={classes.content}>
        <List items={listData} />
      </div>
    </div>
  );
}

export default App;
