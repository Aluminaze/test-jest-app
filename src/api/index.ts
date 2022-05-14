import { IPassengerDto } from "interfaces";
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

interface IGetPassengerDataResponse {
  data: IPassengerDto[];
  totalPages: number;
  totalPassengers: number;
}

export const getPassengerData = async (
  currentPage = 1,
  size = 10
): Promise<IGetPassengerDataResponse> => {
  const url = `https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${size}`;

  const { data } = await axios.get(url);

  return data;
};

interface IGetPassengerDataResponseInfinityScroll
  extends IGetPassengerDataResponse {
  info: {
    currentPage: number;
  };
}

export const getPassengerDataForInfinityScroll = async (
  currentPage = 1,
  size = 10
): Promise<IGetPassengerDataResponseInfinityScroll> => {
  const url = `https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${size}`;

  const { data } = await axios.get(url);

  return {
    ...data,
    info: {
      currentPage,
    },
  };
};
