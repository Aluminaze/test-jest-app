import { usePassengerData } from "hooks/usePassengerData";
import React, { useMemo, useState } from "react";

import { useStyles } from "./styles";
import Pagination from "@mui/material/Pagination";
import { useTable } from "react-table";

export const TablePage = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(10);

  const { data: passengers, isLoading: isLoadingPassengers } = usePassengerData(
    currentPage,
    maxItemsPerPage
  );

  const maxPages: number | null = passengers?.totalPages ?? 0;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const columns: any = useMemo(
    () => [
      {
        Header: "ИД",
        accessor: "idPassenger",
      },
      {
        Header: "Имя пассажира",
        accessor: "namePassenger",
      },
      {
        Header: "Кол-во поездок",
        accessor: "tripCounts",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (passengers?.data) {
      return passengers?.data?.map((data) => ({
        idPassenger: data._id,
        namePassenger: data.name,
        tripCounts: data.trips,
      }));
    } else return [];
  }, [passengers]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
