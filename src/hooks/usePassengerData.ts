import { getPassengerData } from "api";
import { useQuery } from "react-query";

interface IUsePassengerDataParams {
  currentPage: number;
  size: number;
}

export const usePassengerData = (currentPage: number, size: number) => {
  return useQuery(
    ["passengers", { pageSize: size, currentPage: currentPage }],
    () => getPassengerData(currentPage, size),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};
