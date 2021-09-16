import React, { useState } from "react";
import classes from "./App.module.css";
import List from "components/List";
import { listData } from "TestData/ListData";
import Search from "components/Search";

function App() {
  const [value, setValue] = useState<string>("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div className={classes.app}>
      <header className={classes.header}>Test Application</header>
      <div className={classes.content}>
        <Search value={value} onChange={onChangeSearch} />
        <List items={listData} />
      </div>
    </div>
  );
}

export default App;
