import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import List from "components/List";
import { listData } from "TestData/ListData";
import Search from "components/Search";
import axios from "axios";

function getUserData() {
  return Promise.resolve(() => ({ id: 77, name: "Artem" }));
}

const GET_CITIES_URL =
  "https://countriesnow.space/api/v0.1/countries/population/cities";

function App() {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<string[]>(listData);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const [userData, setUserData] = useState<any | null>(null);
  const [cities, setCities] = useState<any[]>([]);

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

  const handleFetchCities = async () => {
    const data = await axios
      .get(GET_CITIES_URL)
      .then((data) => data.data?.data);
    const topCities = data?.length ? data.slice(0, 10) : [];
    setCities(topCities);
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>Test Application</h1>
        {userData && <span>Logged in as: {userData?.name}</span>}
      </header>
      <div className={classes.content}>
        <Search value={value} onChange={onChangeSearch} />
        <List items={data} />

        <div className={classes.cities}>
          <button onClick={handleFetchCities}>Fetch cities</button>

          <ul className={classes.citiesList}>
            {cities.map((city: any) => (
              <li key={city.city}>
                {city.city} ({city.country})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
