import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import List from "components/List";
import { listData } from "TestData/ListData";
import Search from "components/Search";

function getUserData() {
  return Promise.resolve(() => ({ id: 77, name: "Artem" }));
}

function App() {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<string[]>(listData);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (value) {
      setData(
        listData.filter((elem: string) =>
          elem.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setData(listData);
    }
  }, [value]);

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>Test Application</h1>
        {userData && <span>Logged in as: {userData?.name}</span>}
      </header>
      <div className={classes.content}>
        <Search value={value} onChange={onChangeSearch} />
        <List items={data} />
      </div>
    </div>
  );
}

export default App;
