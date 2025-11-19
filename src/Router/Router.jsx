import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Home from "../Pages/Home/Home.jsx";
import Service from "../Pages/Services/Service.jsx";
import Coverage from "../Pages/Coverages/Coverage.jsx";
import AboutUs from "../Pages/AboutUs/AboutUs.jsx";
import Pricing from "../Pages/Pricings/Pricing.jsx";
import Contact from "../Pages/Contacts/Contact.jsx";
import Blog from "../Pages/Blogs/Blog.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <h1>error page</h1>,
    children: [
      { index: true, Component: Home },
      { path: "/service", Component: Service },
      { path: "/coverage", Component: Coverage },
      { path: "/aboutus", Component: AboutUs },
      { path: "/pricing", Component: Pricing },
      { path: "/blog", Component: Blog },
      { path: "/contact", Component: Contact },
    ],
  },
]);

export default Router;
