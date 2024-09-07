import { baseApi } from "../../../api/baseApi";
import { TFilters } from "../product";
import { TQueryParams, TResponse } from "../types";
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
      invalidatesTags: ["Rentals"],
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
    completeRentalCost: builder.mutation<TRental, TRentalCalculateRequest>({
      query: (data) => ({
        url: `/rentals/${data.rentalId}/complete-rental`,
        method: "PUT",
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
  useCompleteRentalCostMutation,
} = rentalApi;
