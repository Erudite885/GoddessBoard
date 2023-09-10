import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import {
  Overview,
  JobDetails,
  JobSearch,
} from "./pages/index";

import { Navbar, Footer, Error } from "./components/index";

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
          element: <Overview />,
        },
        {
          path: "/jobsearch",
          element: <JobSearch />,
        },
        {
          path: "/jobs/:id",
          element: <JobDetails />,
        },
        {
          path: "*",
          element: <Error />,
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
