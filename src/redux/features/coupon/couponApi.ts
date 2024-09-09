import { baseApi } from "../../../api/baseApi";
import { TQueryParams, TResponse } from "../types";
import {
  TCoupon,
  TCouponRequest,
  TValidateCoupon,
  TValidateCouponRequest,
} from "./types";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation<TCoupon, TCouponRequest>({
      query: (newCoupon) => ({
        url: "/coupons",
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["Coupons"],
    }),
    validateCoupon: builder.mutation<
      TResponse<TValidateCoupon>,
      TValidateCouponRequest
    >({
      query: (data) => ({
        url: "/coupons/validate",
        method: "POST",
        body: data,
      }),
    }),
    getCoupons: builder.query<TResponse<TCoupon[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/coupons", params: params };
      },
      providesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation<TResponse<TCoupon>, string>({
      query: (args) => {
        return { url: `/coupons/${args}`, method: "DELETE" };
      },
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useValidateCouponMutation,
  useGetCouponsQuery,
  useDeleteCouponMutation,
} = couponApi;
