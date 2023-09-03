import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jobApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_JSEARCH_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_JSEARCH_RAPIDAPI_HOST,
};

const baseUrl = import.meta.env.VITE_JSEARCH_RAPIDAPI_BASEURL;

const searchJob = "Frontend Developer";
const datePosted = "today";
const remote = true;
const id = "ruV99Y5syPQAAAAAAAAAAA==";
const jobLocation = "New-York, NY, USA";

const createRequest = (url) => ({ url, headers: jobApiHeaders });

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () =>
        createRequest(
          `search?query=${searchJob}&date_posted=${datePosted}&remote_jobs_only=${remote}`
        ),
    }),

    getJobDetails: builder.query({
      query: () => createRequest(`job-details?job_id=${id}`),
    }),

    getJobSearchFilters: builder.query({
      query: () =>
        createRequest(
          `search-filters?query=${searchJob}&date_posted=${datePosted}&remote_jobs_only={remote}`
        ),
    }),

    getJobSalaryEstimate: builder.query({
      query: () =>
        createRequest(
          `estimated-salary?job_title=${searchJob}&location=${jobLocation}`
        ),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useGetJobSalaryEstimateQuery,
  useGetJobSearchFiltersQuery,
} = jobApi;
