import React from "react";
import { useGetJobDetailsQuery } from "../services/jobApi";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components";
import moment from "moment";

const JobDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetJobDetailsQuery(id);
  const details = data?.data[0];

  const date = details.job_offer_expiration_datetime_utc;
  const formattedDate = moment(date).format("MMMM Do, YYYY [at] h:mm A");

  const monthToYears = (month) => {
    const currentDate = moment();
    const pastDate = moment().subtract(
      details.job_required_experience.required_experience_in_months,
      "months"
    );

    const years = currentDate.diff(pastDate, "years");

    return years;
  };

  if (isFetching)
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  console.log(details);

  return (
    <section className="dark:text-white p-16 mx-auto flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={details.employer_logo}
          alt="employer logo"
          className="rounded-full w-20 h-20 object-cover"
        />
        <div>
          <p className="font-medium text-lg">{details.employer_name}</p>
          <h2 className="font-bold text-2xl">{details.job_title}</h2>
        </div>
      </div>

      <div className="flex gap-36 my-4">
        <div>
          <span>{details.job_employment_type}</span>
          <p>
            Date Posted: {moment(details.job_posted_at_datetime_utc).fromNow()}
          </p>
          <p>Publisher: {details.job_publisher}</p>
        </div>

        <div>
          <p>
            {monthToYears(
              details.job_required_experience.required_experience_in_months
            )}
            years experience required
          </p>
          <button className="flex bg-[#ab0b0b] w-full rounded-2xl py-2 justify-center text-white my-4">
            <Link to={`${details.job_apply_link}`}> Apply</Link>
          </button>
        </div>
      </div>

      <h2 className="font-bold mb-4 text-2xl">Description</h2>
      <p className="text-lg tracking-wide leading-loose">
        {details.job_description}
      </p>

      <div className="flex gap-10 py-4">
        <div className=" w-1/2">
          <h2 className="font-bold my-4 text-xl">Qualifications</h2>
          <h2>
            {details.job_highlights.Qualifications.map((qualification, i) => (
              <ul key={i}>
                <li key={id} className="list-disc mb-2">
                  {qualification}
                </li>
              </ul>
            ))}
          </h2>
        </div>

        <div>
          <h2 className="font-bold my-4 text-xl">Benefits</h2>
          <h2>
            {details.job_highlights.Benefits.map((benefit) => (
              <ul>
                <li className="list-disc mb-2">{benefit}</li>
              </ul>
            ))}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-24">
        <button className="flex border border-[#ab0b0b] w-1/6 cursor-pointer rounded-2xl py-2 justify-center text-[#ab0b0b] my-4">
          <Link to={`${details.job_google_link}`}>Google Link</Link>
        </button>
        <p className="">
          Offer Expiration: <span className="font-bold">{formattedDate}</span>
        </p>
      </div>

      <div className="flex justify-center ">
        <button className="flex bg-[#ab0b0b] w-[20rem] cursor-pointer rounded-2xl p-2 justify-center text-white my-4">
          <Link to={`${details.job_apply_link}`}> Apply Now</Link>
        </button>
      </div>

      <div className="flex gap-10 py-4">
        <div className="w-1/2 ">
          <h2 className="text-lg font-bold mb-4">Estimated Salaries</h2>
          {details.estimated_salaries.map((salaryEstimate) => (
            <>
              <p className="font-semibold">{salaryEstimate.publisher_name}</p>
              <span className="text-sm">
                {" "}
                <b>currency:</b> {salaryEstimate.salary_currency}
              </span>{" "}
              /<span className="text-sm">{salaryEstimate.salary_period}</span>
              <p className="font-semibold">
                max salary: {salaryEstimate.max_salary.toLocaleString()}
              </p>
              <p className="font-semibold">
                median salary: {salaryEstimate.median_salary.toLocaleString()}
              </p>
              <p className="font-semibold">
                min salary: {salaryEstimate.min_salary.toLocaleString()}
              </p>
              <p className="font-semibold">
                location: {salaryEstimate.location}{" "}
              </p>
              <button className="flex border border-[#ab0b0b] w-1/2 cursor-pointer rounded-2xl py-2 justify-center text-[#ab0b0b] my-4">
                <Link to={`${salaryEstimate.publisher_link}`}>
                  {" "}
                  View salary Estimate
                </Link>
              </button>
            </>
          ))}
        </div>

        <div>
          <h2 className="text-lg mb-4 font-bold">Reviews</h2>
          {details.employer_reviews.map((review) => (
            <>
              <p>
                <b>Review Publisher:</b>
                {"  "} {review.publisher}
              </p>
              <b>Review Stars: </b>
              {"  "}
              <span>
                {review.num_stars} / {review.max_score}
              </span>
              <button className="flex border border-[#ab0b0b] w-full cursor-pointer rounded-2xl py-2 justify-center text-[#ab0b0b] my-4">
                <Link to={`${review.reviews_link}`}>Review Link</Link>
              </button>
            </>
          ))}
        </div>
      </div>

      <div className="flex justify-center ">
        <button className="flex bg-[#ab0b0b] w-[20rem] cursor-pointer rounded-2xl p-2 justify-center text-white my-4">
          <Link to={`${details.job_apply_link}`}> Apply Now</Link>
        </button>
      </div>
    </section>
  );
};

export default JobDetails;
