import React from "react";
import {
  useGetJobsQuery,
  // useGetJobDetailsQuery,
  // useGetJobSalaryEstimateQuery,
  // useGetJobSearchFiltersQuery,
} from "../services/jobApi";
import { Link } from "react-router-dom";
import {JobSearch} from "./index";

const Overview = () => {
  const { data, isFetching } = useGetJobsQuery();
  const jobs = data?.data;
  
  if (isFetching) {
    return <p>Please Wait...</p>;
  }
  // console.log(data?.data);

  return (
    <section className="flex flex-col container w-full py-8 lg:max-w-7xl mx-auto">
      <div className="flex items-center justify-between mx-6 ss:mx-20 mb-6">
        <h2>Frontend React Jobs today.</h2>
        <button className="bg-[#ab0b0b] rounded-lg p-1 text-white">
          <Link to="/jobsearch">Show More</Link>
        </button>
      </div>
      <div>
        {/* {jobs.slice(0, 4).map(job => (
          <div></div>
        ))} */}
      </div>
    </section>
  );
};

export default Overview;
