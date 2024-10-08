import { baseApi } from "./baseApi";

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    imageUpload: builder.mutation({
      query: (payload) => ({
        url: "upload/image/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useImageUploadMutation } = uploadApi;
