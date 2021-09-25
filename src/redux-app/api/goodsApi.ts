import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  name: string;
}

type Products = Product[];

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (buldier) => ({
    getGoods: buldier.query<Products, void>({
      query: () => `goods`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: Product) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProduct: buldier.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: `goods`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: buldier.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = goodsApi;
