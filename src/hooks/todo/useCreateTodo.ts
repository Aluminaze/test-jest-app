import { TodoItem } from "./../../types/index";
import api from "api";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

export const useCreateTodo = () => {
  const client = useQueryClient();

  const mutation = useMutation(
    (newTodo: TodoItem) => api.fetchCreateTodo(newTodo),
    {
      async onMutate(newValue: TodoItem) {
        const prevValue = client.getQueryData("todos");

        await client.setQueriesData("todos", (oldValues: any) => {
          return [...oldValues, { ...newValue }];
        });

        return () => client.setQueriesData("todos", prevValue);
      },
    }
  );

  return mutation;
};
