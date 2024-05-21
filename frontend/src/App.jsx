import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import allbanner from "./assets/allbanner.png";
import electronicsbanner from "./assets/electronicsbanner.png";
import grocerybanner from "./assets/grocerybanner.png";
import Miscellaneousbanner from "./assets/miscellaneousbanner.png";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute"; // Make sure PrivateRoute is imported correctly
import NotFound from "./components/NotFound";
import User from "./pages/User";
import PaymentCancel from "./components/PaymentCancel";
import PaymentSuccess from "./components/PaymentSuccess";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    setIsAuthenticated(!!token);
  }, []);

  return (
    <main className="text-tertiary min-h-screen ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/all"
            element={<AllProducts category={"all"} banner={allbanner} />}
          />
          <Route
            path="/groceries"
            element={<Category category={"groceries"} banner={grocerybanner} />}
          />
          <Route
            path="/electronics"
            element={
              <Category category={"electronics"} banner={electronicsbanner} />
            }
          />

          <Route
            path="/miscellaneous"
            element={
              <Category
                category={"miscellaneous"}
                banner={Miscellaneousbanner}
              />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route
            path="/cart-page"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/cart-page" element={<Cart />} />
          </Route>
          {/* <Route
            path="/user-page"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/user-page" element={<User />} />
          </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/user-page" element={<User />} />
          <Route path="/paysuccess" element={<PaymentSuccess />} />
          <Route path="/paycancel" element={<PaymentCancel />} />
        </Routes>
        <Footer className="py-4 bg-gray-200" />
      </BrowserRouter>
    </main>
  );
}
