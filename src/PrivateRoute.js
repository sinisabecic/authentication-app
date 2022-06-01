import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ loggedIn, redirectPath = "/", children }) => {
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
