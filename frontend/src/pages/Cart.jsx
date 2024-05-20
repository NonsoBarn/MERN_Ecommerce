import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import CartItems from "../components/CartItems";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const totalCartItems = getTotalCartItems();

  return <div>{totalCartItems > 0 ? <CartItems /> : <EmptyCart />}</div>;
};

export default Cart;
