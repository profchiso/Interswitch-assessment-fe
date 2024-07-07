// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "process.env.REACT_APP_API_BASE_URL" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
    }),
    getUserByID: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserByIDQuery } = userApi;
