import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import {
  CompanyDetails,
  Dashboard,
  EstimatedSalaries,
  JobDetails,
  JobSearch,
} from "./pages/index";
import { Navbar, Footer } from "./components/index";

const App = () => {
  const Layout = () => {
    return (
      <div className="dark:bg-[#13131a] min-h-full">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/jobsearch",
          element: <JobSearch />,
        },
        {
          path: "/estimatedSalaries",
          element: <EstimatedSalaries />,
        },
        {
          path: "/jobs/:id",
          element: <JobDetails />,
        },
        {
          path: "/companies/:companyName",
          element: <CompanyDetails />,
        },
      ],
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
