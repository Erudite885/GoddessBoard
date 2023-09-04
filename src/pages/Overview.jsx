import React from "react";
import {
  useGetJobsQuery,
  // useGetJobDetailsQuery,
  // useGetJobSalaryEstimateQuery,
  // useGetJobSearchFiltersQuery,
} from "../services/jobApi";
import { Link, Navigate } from "react-router-dom";
// import {JobSearch} from "./index";
import moment from "moment";

const Overview = () => {
  const { data, isFetching } = useGetJobsQuery();
  const jobs = data?.data;

  const specificTime = moment(jobs?.job_posted_at_datetime_utc); // Specific time to compare
  const oneHourAgo = moment().subtract(1, "hour"); // Calculate the time 1 hour ago

  const color = specificTime.isAfter(oneHourAgo) ? "red" : "limegreen"; // Ternary expression to check if specific time is greater than 1 hour ago

  if (isFetching) {
    return <p>Please Wait...</p>;
  }
  // console.log(data?.data);

  return (
    <section className="flex flex-col container w-full py-8 lg:max-w-7xl mx-auto">
      <div className="flex items-center justify-between mx-6 ss:mx-20 mb-6">
        <h2 className="text-2xl font-bold ">Frontend React Jobs today.</h2>
        <button className="bg-[#ab0b0b] rounded-lg p-1 text-white">
          <Link to="/jobsearch">Show More</Link>
        </button>
      </div>
      <div
        onClick={() => {
          // Navigate({'/job-search'})
        }}
        className="flex flex-wrap justify-center items-center p-16">
        {jobs.slice(0, 4).map((job) => (
          <div
            key={job.job_id}
            className="border rounded-xl w-[280px] mx-4 py-4 px-4 mb-4 border-red-400 "
          >
            <div className="flex max-w-xs items-center mb-2 gap-2">
              <img
                src={job.employer_logo}
                alt={job.employer_name}
                className="w-8 h-8 rounded-full"
              />
              <h2 className="font-semibold text-xs">{job.employer_name}</h2>
            </div>
            <h6 className="mb-2 text-slate-500 ">{job.job_publisher}</h6>
            <p>
              {job.job_description.length > 300
                ? `${job.job_description.substring(0, 200)}...`
                : `${job.job_description}`}{" "}
            </p>
            <p style={{ color }} className={`py-2 text-sm`}>
              {moment(job.job_posted_at_datetime_utc).fromNow()}{" "}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
