import React from "react";
import { useGetJobsQuery } from "../services/jobApi";
import { Link } from "react-router-dom";
import moment from "moment";
import { Loader } from "../components";
import { gradLogo } from "../assets";

const Overview = () => {
  const { data, isFetching } = useGetJobsQuery(
    {
      searchJob: "Frontend Developer",
      datePosted: "today",
      remote: true,
    },
    {
      pollingInterval: 3000,
    }
  );

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  const jobs = data?.data;

  const sortedJobs = [...jobs].sort((a, b) =>
    moment(b.job_posted_at_datetime_utc).diff(
      moment(a.job_posted_at_datetime_utc)
    )
  );

  const specificTime = moment(jobs?.job_posted_at_datetime_utc);
  const oneHourAgo = moment().subtract(1, "hour");
  const color = specificTime.isAfter(oneHourAgo) ? "red" : "limegreen";

  return (
    <section className="flex flex-col container w-full py-8 lg:max-w-7xl mx-auto dark:text-white">
      <div className="flex items-center justify-between mx-6 ss:mx-20 mb-6">
        <h2 className="text-2xl font-bold ">Frontend React Jobs today.</h2>
        <button className="bg-[#ab0b0b] rounded-lg p-1 text-white">
          <Link to="/jobsearch">Show More</Link>
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center items-center p-16">
        {sortedJobs.map((job) => (
          <div
            key={job.job_id}
            className="border rounded-xl w-[300px] md:w-[580px] py-4 px-2 mb-4 border-red-600 "
          >
            <div className="flex max-w-xs items-center mb-2 gap-2">
              <img
                src={job.employer_logo || gradLogo}
                alt={job.employer_name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col cursor-pointer">
                <Link to={`jobs/${job.job_id}`}>
                  <h2 className="font-semibold text-xs">{job.job_title}</h2>
                  <h2 className="font-medium mt-1 text-xs">
                    {job.employer_name}
                  </h2>
                </Link>
              </div>
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
