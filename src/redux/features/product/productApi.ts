import { baseApi } from "../../../api/baseApi";
import { TResponse } from "../types";
import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "./productSlice";
import { TFilters, TProduct } from "./types";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<TResponse<TProduct>, Partial<TProduct>>({
      query: (newProduct) => ({
        url: "/bikes/create",
        method: "POST",
        body: newProduct,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProduct(data.data as TProduct));
        } catch (error) {}
      },
    }),
    getProducts: builder.query<TResponse<TProduct[]>, TFilters | undefined>({
      query: (filters) => {
        let params: any = {};
        if (filters) {
          params = Object.keys(filters).reduce((acc, key) => {
            const filterKey = key as keyof TFilters;
            const value = filters[filterKey];
            if (value !== undefined) {
              if (filterKey === "priceGte") {
                acc["price[gte]"] = value;
              } else if (filterKey === "priceLte") {
                acc["price[lte]"] = value;
              } else {
                acc[filterKey] = value;
              }
            }
            return acc;
          }, {} as Record<string, any>);
          if (filters.limit !== undefined) {
            params.limit = filters.limit;
          }
          if (filters.page !== undefined) {
            params.page = filters.page;
          }
        }

        return { url: "bikes", params };
      },
      onQueryStarted: async (filters, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data.data as TProduct[]));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
      providesTags: ["Products"],
    }),
    getProductsById: builder.query<TResponse<TProduct>, string>({
      query: (productId) => ({
        url: `/bikes/${productId}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation<TResponse<TProduct>, TProduct>({
      query: (payload) => ({
        url: `/bikes/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProduct(data.data as TProduct));
        } catch (err) {}
      },
    }),
    deleteProduct: builder.mutation<TResponse<TProduct>, string>({
      query: (productId) => ({
        url: `/bikes/${productId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteProduct(data?.data?._id as string));
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;
