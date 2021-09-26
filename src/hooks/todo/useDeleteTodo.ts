import api from "api";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";

export const useDeleteTodo = () => {
  const client = useQueryClient();

  const mutation = useMutation(
    (payload: string) => api.fetchDeleteTodo(payload),
    {
      onMutate: async () => {
        await client.cancelQueries("todos");
      },
      onSuccess: (...result) => {
        console.log("~ data", result);
      },
      onSettled: () => {
        client.invalidateQueries("todos");
      },
    }
  );

  return mutation;
};
