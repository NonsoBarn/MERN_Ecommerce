import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";

import ListOrder from "../components/ListOrder";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    setIsAuthenticated(!!token);
  }, []);
  return (
    <div className="lg:flex">
      <SideBar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/addproduct"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>

        <Route
          path="/listproduct"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/listproduct" element={<ListProduct />} />
        </Route>

        <Route
          path="/listorder"
          element={
            <PrivateRoute>
              <ListOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/listorder"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/listorder" element={<ListOrder />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
