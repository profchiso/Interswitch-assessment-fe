// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "process.env.REACT_APP_API_BASE_URL" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
    }),
    getPostByID: builder.query({
      query: (id) => `posts/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetPostByIDQuery } = postApi;
