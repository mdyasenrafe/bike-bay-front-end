import { baseApi } from "../../../api/baseApi";
import { TResponse } from "../types";
import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "./productSlice";
import { OptionType, TFilters, TProduct } from "./types";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<TResponse<TProduct>, Partial<TProduct>>({
      query: (newProduct) => ({
        url: "/bikes",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query<TResponse<TProduct[]>, TFilters | undefined>({
      query: (filters) => {
        let params: any = {};
        if (filters) {
          params = Object.keys(filters).reduce((acc, key) => {
            const filterKey = key as keyof TFilters;
            const value = filters[filterKey];
            if (value !== undefined || !value) {
              if (filterKey === "priceGte") {
                acc["pricePerHour[gte]"] = value;
              } else if (filterKey === "priceLte") {
                acc["pricePerHour[lte]"] = value;
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
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<TResponse<TProduct>, string>({
      query: (productId) => ({
        url: `/bikes/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getBikeBrands: builder.query<TResponse<OptionType[]>, undefined>({
      query: () => ({
        url: `/bikes/bike-brands`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetBikeBrandsQuery,
} = ProductApi;
