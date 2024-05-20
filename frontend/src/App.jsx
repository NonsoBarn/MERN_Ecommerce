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

export default function App() {
  return (
    <main className="text-tertiary">
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

          <Route path="/cart-page" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
