import { getPassengerDataForInfinityScroll } from "api";
import { IPassengerDto } from "interfaces";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useStyles } from "./styles";

export const InfinityScrollPage = (): JSX.Element => {
  const classes = useStyles();

  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["passengers1"],
    ({ pageParam = 1 }) => getPassengerDataForInfinityScroll(pageParam, 30),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        const lastCurrentPage: number = lastPage.info.currentPage;
        const maxPages: number = lastPage.totalPages;

        return maxPages > lastCurrentPage ? lastCurrentPage + 1 : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={classes.container}>
      <h1>Infinity Scroll</h1>

      <div className={classes.blockContent}>
        {isLoading && <span>LOADING...</span>}
        {!isLoading &&
          data?.pages?.map((page: any) =>
            page.data.map((passengerData: IPassengerDto) => (
              <li key={passengerData._id}>{passengerData.name}</li>
            ))
          )}
      </div>
      {hasNextPage && (
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "LOADING..." : "Load more..."}
        </button>
      )}
    </div>
  );
};
