import { baseApi } from "../../../api/baseApi";
import { TResponse } from "../types";
import { updateUser } from "./authSlice";
import { TSigninValue, TSignupValue, TUpdateValue, TUser } from "./types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TResponse<TUser>, TSigninValue>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<TResponse<TUser>, TSignupValue>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    update: builder.mutation<TResponse<TUser>, TUpdateValue>({
      query: (data) => ({
        url: "users/me",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUser(data?.data as TUser));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useUpdateMutation } =
  authApi;
