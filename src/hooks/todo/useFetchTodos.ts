import { TodoItem } from "./../../types/index";
import api from "api";
import { useQuery } from "react-query";

export const useFetchTodos = () => {
  const query = useQuery<TodoItem[], Error>("todos", api.fetchTodos);

  return query;
};
