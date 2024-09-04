import { baseApi } from "../../../api/baseApi";
import { TRentalRequest, TRentalResponse } from "./types";

const rentalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRental: builder.mutation<TRentalResponse, TRentalRequest>({
      query: (rentalData) => ({
        url: "/rentals",
        method: "POST",
        body: { rentalDetails: rentalData },
      }),
    }),
  }),
});

export const { useCreateRentalMutation } = rentalApi;
