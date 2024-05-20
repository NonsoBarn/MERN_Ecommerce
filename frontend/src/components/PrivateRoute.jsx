/* eslint-disable react/prop-types */

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
