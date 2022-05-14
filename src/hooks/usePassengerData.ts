import { getPassengerData } from "api";
import { useQuery } from "react-query";

interface IUsePassengerDataParams {
  currentPage: number;
  size: number;
}

export const usePassengerData = (params: IUsePassengerDataParams) => {
  return useQuery(
    "passengers",
    () => getPassengerData(params.currentPage, params.size),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};
