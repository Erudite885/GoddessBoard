import React, { useEffect, useState } from "react";
import { useLazyGetJobSearchFiltersQuery } from "../services/jobApi";
import { Loader } from "../components";
import moment from "moment";
import { Link } from "react-router-dom";

const JobSearch = ({ simplified }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [getSearch, { data, isFetching }] = useLazyGetJobSearchFiltersQuery();

  const handleSearch = async (e) => {
    e.preventDefault();

    const { data } = await getSearch({
      query: searchQuery,
      datePosted: "today",
      remote: "true",
      requirements: "under_3_years_experience",
    });
  };

  const jobs = data?.data;

  const sortedJobs = jobs
    ?.slice()
    .sort((a, b) =>
      moment(b.job_posted_at_datetime_utc).diff(
        moment(a.job_posted_at_datetime_utc)
      )
    );

  return (
    <>
      {!simplified && (
        <div className="flex py-10 items-center justify-center">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Jobs..."
              className="md:w-[480px] py-4 rounded-l-md px-4 mx-auto outline-none"
            />
            <button
              className="bg-[#ab0b0b] text-white rounded-r-lg p-4"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      )}
      <h2 className="items-center dark:text-white justify-center flex font-semibold text-xl">
        Job Listings
      </h2>
      {isFetching ? (
        <div>
          <Loader />
        </div>
      ) : (
        <section className="flex dark:text-white flex-wrap lg:max-w-7xl justify-center py-8">
          {sortedJobs?.map((job) => {
            const specificTime = moment(job.job_posted_at_datetime_utc);
            const oneHourAgo = moment().subtract(1, "hour");
            const color = specificTime.isAfter(oneHourAgo) ? "lime" : "red";

            return (
              <Link key={job.job_id} to={`/jobs/${job.job_id}`}>
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
                    <h2 className="font-semibold text-xs">
                      {job.employer_name}
                    </h2>
                  </div>
                  <h6 className="mb-2 text-slate-500">{job.job_publisher}</h6>
                  <p>
                    {job.job_description.length > 300
                      ? `${job.job_description.substring(0, 200)}...`
                      : `${job.job_description}`}
                  </p>
                  <p style={{ color }} className="py-2 text-sm">
                    {moment(job.job_posted_at_datetime_utc).fromNow()}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
};

export default JobSearch;
