import { TodoItem } from "types/index";
import api from "api";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

export const useCreateTodo = () => {
  const client = useQueryClient();

  const mutation = useMutation(
    (payload: TodoItem) => api.fetchCreateTodo(payload),
    {
      onMutate: async (payload: TodoItem) => {
        await client.cancelQueries("todos");

        const newValue: TodoItem = { ...payload };

        await client.setQueriesData("todos", (oldValues: any) => {
          return [...oldValues, newValue];
        });

        return { newValue };
      },
      onSuccess: (result, variables, context) => {
        client.setQueryData("todos", (old: any) =>
          old.map((todo: any) =>
            todo.id === context?.newValue.id ? result : todo
          )
        );
      },
      onError: (error, variables, context) => {
        client.setQueriesData("todos", (old: any) =>
          old.filter((todo: any) => todo.id !== context?.newValue.id)
        );
      },
      retry: 3,
    }
  );

  return mutation;
};
