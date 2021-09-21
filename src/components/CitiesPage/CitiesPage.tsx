import React, { useState } from "react";
import classes from "./CitiesPage.module.css";
import axios from "axios";

const GET_CITIES_URL =
  "https://countriesnow.space/api/v0.1/countries/population/cities";

const CitiesPage = () => {
  const [cities, setCities] = useState<any[]>([]);

  const handleFetchCities = async () => {
    const data = await axios
      .get(GET_CITIES_URL)
      .then((data) => data.data?.data);
    const topCities = data?.length ? data.slice(0, 10) : [];
    setCities(topCities);
  };

  return (
    <div className={classes.cities}>
      <button onClick={handleFetchCities}>Fetch cities</button>

      <ul className={classes.citiesList} data-testid="cities">
        {cities.map((city: any) => (
          <li key={city.city}>
            {city.city} ({city.country})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;
