import { baseApi } from "../../../api/baseApi";
import { TFilters } from "../product";
import { TQueryParams, TResponse } from "../types";
import { addRental, setRentals } from "./rentalSlice";
import {
  TRental,
  TRentalCalculateRequest,
  TRentalRequest,
  TRentalResponse,
} from "./types";

const rentalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRental: builder.mutation<TRentalResponse, TRentalRequest>({
      query: (rentalData) => ({
        url: "/rentals",
        method: "POST",
        body: rentalData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(addRental(data.rental as TRental));
        } catch (error) {}
      },
    }),
    getUserRentals: builder.query<TResponse<TRental[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "rentals", params: params };
      },
      providesTags: ["Rentals"],
      onQueryStarted: async (filters, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setRentals(data.data as TRental[]));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
    }),
    getAllRentals: builder.query<TResponse<TRental[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/rentals/get-all-rentals", params: params };
      },
      providesTags: ["Rentals"],
    }),
    calculateRentalCost: builder.mutation<TRental, TRentalCalculateRequest>({
      query: (data) => ({
        url: `/rentals/${data.rentalId}/calculate`,
        method: "PUT",
        body: { endTime: data.endTime },
      }),
      invalidatesTags: ["Rentals"],
    }),
  }),
});

export const {
  useCreateRentalMutation,
  useGetUserRentalsQuery,
  useGetAllRentalsQuery,
  useCalculateRentalCostMutation,
} = rentalApi;
