import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (buldier) => ({
    getGoods: buldier.query<any, void>({
      query: () => `goods`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProduct: buldier.mutation({
      query: (body) => ({
        url: `goods`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const { useGetGoodsQuery, useAddProductMutation } = goodsApi;
