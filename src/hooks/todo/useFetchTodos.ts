import api from "api";
import { useQuery } from "react-query";

export const useFetchTodos = () => {
  const query = useQuery("todos", api.fetchTodos);

  return query;
};
