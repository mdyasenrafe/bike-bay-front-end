import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://advance-uni-server.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseapi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
