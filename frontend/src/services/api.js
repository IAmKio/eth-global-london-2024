// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tokenTipApi = createApi({
  reducerPath: "tokenTipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOSTNAME,
    prepareHeaders: async (headers) => {
      const uid = localStorage.getItem("uid");

      if (uid) {
        headers.set("x-uid", uid);
      } else {
        console.warn("No UID found!");
      }
    },
  }),
  endpoints: (builder) => ({
    getJars: builder.query({
      query: () => `jars`,
    }),
    getAllJars: builder.query({
      query: () => `jars/all`,
    }),
    getJarsById: builder.query({
      query: (id) => `jars/handle/${id}`,
    }),
    updateJars: builder.mutation({
      query: (createData) => ({
        url: `jars`,
        method: "POST",
        body: createData,
      }),
    }),
  }),
});

export const {
  useGetAllJarsQuery,
  useGetJarsQuery,
  useGetJarsByIdQuery,
  useUpdateJarsMutation,
} = tokenTipApi;
