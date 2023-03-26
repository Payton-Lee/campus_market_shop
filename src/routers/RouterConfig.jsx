import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const LoadingTip = () => <div>加载路由ing...</div>;

import Home from "./Home";
import Goods from "./Goods";
import User from "./User";
import Cart from "./Cart";
import Login from "./Login";
import Buy from "./Buy";

const RouterConfig = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      navigator: "/home/goods",
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/buy",
      element: <Buy />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "/home/goods",
          element: <Goods />,
        },
        {
          path: "/home/cart",
          element: <Cart />,
        },
        {
          path: "/home/user",
          element: <User />,
        },
      ],
    },
  ]);
  return routes;
};

export default RouterConfig;
