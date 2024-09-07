import { baseApi } from "../../../api/baseApi";
import { TUser, updateUser } from "../auth";
import { TResponse } from "../types";
import { TUpdateValue } from "./types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useUpdateMutation } = userApi;
