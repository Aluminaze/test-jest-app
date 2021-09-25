import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (buldier) => ({
    getGoods: buldier.query<any, void>({
      query: () => `goods`,
    }),
  }),
});

export const { useGetGoodsQuery } = goodsApi;
