import React, { useEffect, useState } from "react";
import { useGetJobsQuery } from "../services/jobApi";
import { Loader } from "../components";

const JobSearch = ({ simplified }) => {
  // const count = simplified ? 4 : 10;
  const { data: jobs, isFetching } = useGetJobsQuery();
  const jobsList = jobs?.data;

  if (isFetching) return <Loader />;
  console.log(jobsList);

  return (
    <>
      {!simplified && (
        <div className="flex py-8 mx-auto ">
          <input
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            placeholder="Search Jobs"
            className="w-[480px] py-4 rounded-md px-4 mx-auto outline-none "
          />
        </div>
      )}
      {jobsList?.map((job) => (
        <div key={job.job_id} className='border rounded-xl mx-4 py-4 px-4 mb-4 border-red-400 '>
          <div className="flex items-center mb-2 gap-2">
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
          {/* <h2>Qualification</h2>
          <ul>
            <li>{job.job_highlights.Qualifications}</li>
          </ul>
          <h2>Responsibilities</h2>
          <ul>
            <li>{job.job_highlights.Responsibilities}</li>
          </ul> */}
        </div>
      ))}
    </>
  );
};

export default JobSearch;
