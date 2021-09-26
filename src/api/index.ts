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
};

export default api;
