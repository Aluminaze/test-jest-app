import { usePassengerData } from "hooks/usePassengerData";
import { IPassengerDto } from "interfaces";
import React, { useState } from "react";

import { useStyles } from "./styles";

export const TablePage = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage] = useState<number>(10);

  const { data: passengers, isLoading: isLoadingPassengers } = usePassengerData(
    {
      currentPage: currentPage,
      size: maxItemsPerPage,
    }
  );

  const passengerData: IPassengerDto[] = passengers?.data ?? [];

  return (
    <div className={classes.container}>
      <h1>PASSANGER INFO</h1>

      <div className={classes.block}>
        {isLoadingPassengers && <span>LOADING...</span>}
        {!isLoadingPassengers &&
          passengerData.map((passenger: IPassengerDto, index: number) => (
            <li key={index}>{passenger._id}</li>
          ))}
      </div>
    </div>
  );
};
