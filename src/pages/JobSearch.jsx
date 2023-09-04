import React, { useEffect, useState } from "react";
import { useGetJobsQuery } from "../services/jobApi";
import { Loader, Pagination } from "../components";
// moment
// import useGetFormattedJobData from "../utils/useGetFormattedJobData";
import moment from "moment";

const JobSearch = ({ simplified, job }) => {
  // const count = simplified ? 4 : 10;
  const { data: jobs, isFetching } = useGetJobsQuery();
  const jobsList = jobs?.data;

  if (isFetching) return <Loader />;
  console.log(jobsList);

  // const jobData = useGetFormattedJobData(job)

  const specificTime = moment(jobsList.job_posted_at_datetime_utc); // Specific time to compare
  const oneHourAgo = moment().subtract(1, "hour"); // Calculate the time 1 hour ago

  const color = specificTime.isAfter(oneHourAgo) ? "red" : "limegreen"; // Ternary expression to check if specific time is greater than 1 hour ago

  return (
    <>
      {!simplified && (
        <div className="flex py-10 mx-auto ">
          <input
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            placeholder="Search Jobs"
            className="w-[480px] py-4 rounded-md px-4 mx-auto outline-none "
          />
        </div>
      )}
      <section className="flex flex-wrap lg:max-w-7xl mx-auto">
        {jobsList?.map((job) => (
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
       
      </section>
      <Pagination />
    </>
  );
};

export default JobSearch;
