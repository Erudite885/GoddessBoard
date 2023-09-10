import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jobApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_JSEARCH_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_JSEARCH_RAPIDAPI_HOST,
};

const baseUrl = import.meta.env.VITE_JSEARCH_RAPIDAPI_BASEURL;

const createRequest = (url) => ({ url, headers: jobApiHeaders });

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ searchJob, datePosted, remote }) =>
        createRequest(
          `search?query=${searchJob}&date_posted=${datePosted}&remote_jobs_only=${remote}`
        ),
    }),

    getJobDetails: builder.query({
      query: (id) => createRequest(`job-details?job_id=${id}`),
    }),

    getJobSearchFilters: builder.query({
      query: ({ query, datePosted, remote, requirements }) =>
        createRequest(
          `search?query=${query}&date_posted=${datePosted}&remote_jobs_only=${remote}&job_requirements=${requirements}`
        ),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useLazyGetJobSearchFiltersQuery,
} = jobApi;
