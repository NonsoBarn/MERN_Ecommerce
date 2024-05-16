import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import clothingbanner from "./assets/clothingbanner.png";
import electronicsbanner from "./assets/electronicsbanner.png";
import cosmeticsbanner from "./assets/cosmeticsbanner.png";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

export default function App() {
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/all" element={<Home />} />
          <Route
            path="/all"
            element={<Category category={"all"} banner={clothingbanner} />}
          />
          <Route
            path="/groceries"
            element={
              <Category category={"groceries"} banner={cosmeticsbanner} />
            }
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
              <Category category={"miscellaneous"} banner={electronicsbanner} />
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
