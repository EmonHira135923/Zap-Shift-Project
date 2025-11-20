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
import Error404 from "../Pages/ErrorPages/Error404.jsx";
import Story from "../Componets/AllAboutUS/Story.jsx";
import Mission from "../Componets/AllAboutUS/Mission.jsx";
import Success from "../Componets/AllAboutUS/Success.jsx";
import TeamsandOther from "../Componets/AllAboutUS/TeamsandOther.jsx";
import Authentication from "../layout/Authentication.jsx";
import UserLogin from "../Pages/Login/UserLogin.jsx";
import UserReg from "../Pages/Registration/UserReg.jsx";
import UserForget from "../Pages/ForgetPassword/UserForget.jsx";
import UserCode from "../Pages/ForgetPassword/UserCode.jsx";
import UserPass from "../Pages/ForgetPassword/UserPass.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error404></Error404>,
    children: [
      { index: true, Component: Home },
      { path: "/service", Component: Service },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("warehouses.json"),
      },
      {
        path: "/aboutus",
        Component: AboutUs,
        children: [
          {
            index: true,
            Component: Story,
          },
          {
            path: "mission",
            Component: Mission,
          },
          {
            path: "success",
            Component: Success,
          },
          {
            path: "teamothers",
            Component: TeamsandOther,
          },
        ],
      },
      { path: "/pricing", Component: Pricing },
      { path: "/blog", Component: Blog },
      { path: "/contact", Component: Contact },
    ],
  },
  {
    path: "/",
    Component: Authentication,
    children: [
      {
        path: "login",
        Component: UserLogin,
      },
      {
        path: "register",
        Component: UserReg,
      },
      {
        path: "forgot",
        Component: UserForget,
      },
      {
        path: "getcode",
        Component: UserCode,
      },
      {
        path: "resetpass",
        Component: UserPass,
      },
    ],
  },
]);

export default Router;
