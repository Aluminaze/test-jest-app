import { TodoItem } from "types/index";
import axios from "axios";

const BASE_URL = "http://localhost:3001/";

const api = {
  async fetchTodos() {
    const response = await axios.get(BASE_URL + "todo");
    return response.data;
  },
  async fetchCreateTodo(body: TodoItem) {
    const response = await axios.post(BASE_URL + "todo", body);

    return response.data;
  },
  async fetchDeleteTodo(id: string) {
    const response = await axios.delete(BASE_URL + `todo/${id}`);

    return response.data;
  },
};

export default api;
