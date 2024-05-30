import { Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import ListUser from "../components/ListUser";
import ListOrder from "../components/ListOrder";

const Admin = () => {
  return (
    <div className="lg:flex">
      <SideBar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/listorder" element={<ListOrder />} />
      </Routes>
    </div>
  );
};

export default Admin;
