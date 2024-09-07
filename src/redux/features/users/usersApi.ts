import { baseApi } from "../../../api/baseApi";
import { TUser, updateUser } from "../auth";
import { TResponse } from "../types";
import { TUpdateValue } from "./types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<TResponse<TUser[]>, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["Users"],
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
          console.error("Failed to update user:", error);
        }
      },
    }),
    updateRole: builder.mutation<TResponse<TUser>, string>({
      query: (id) => ({
        url: `users/role-update/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    softDeleteUser: builder.mutation<TResponse<TUser>, string>({
      query: (id) => ({
        url: `users/change-status/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateMutation,
  useUpdateRoleMutation,
  useSoftDeleteUserMutation,
} = userApi;
