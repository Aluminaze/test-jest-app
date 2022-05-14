import { usePassengerData } from "hooks/usePassengerData";
import { IPassengerDto } from "interfaces";
import React, { useState } from "react";

import { useStyles } from "./styles";
import Pagination from "@mui/material/Pagination";

export const TablePage = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(10);

  const { data: passengers, isLoading: isLoadingPassengers } = usePassengerData(
    currentPage,
    maxItemsPerPage
  );

  const passengerData: IPassengerDto[] = passengers?.data ?? [];
  const maxPages: number | null = passengers?.totalPages ?? 0;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.container}>
      <h1>PASSANGER INFO</h1>

      <div className={classes.blockSetting}>
        <span>Количество элементов:</span>
        <input
          type="number"
          value={maxItemsPerPage}
          onChange={(e: any) => setMaxItemsPerPage(e.target.value)}
        />
      </div>

      <div className={classes.blockTable}>
        {isLoadingPassengers && <span>LOADING...</span>}
        {!isLoadingPassengers &&
          passengerData.map((passenger: IPassengerDto, index: number) => (
            <li key={index}>{passenger._id}</li>
          ))}
      </div>

      {maxPages > 0 && (
        <div className={classes.blockPagination}>
          <Pagination
            count={maxPages - 1}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};
