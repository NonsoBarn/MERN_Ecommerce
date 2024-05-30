/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [userId, setUserId] = useState(null); // Add userId state

  useEffect(() => {
    fetch("http://localhost:4000/api/products/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_products(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/api/users/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));

      // Fetch userId and set it
      fetch("http://localhost:4000/api/users/getuser", {
        method: "GET",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserId(data.user._id)); // Assuming the response contains the user id
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/api/users/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    toast.success("Item added to cart!");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/api/users/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    toast.success("Item removed from cart!");
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const resetCart = async () => {
    setCartItems(getDefaultCart());

    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/clearcart",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
        const data = await response.json();
        console.log("Cart cleared:", data);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    userId,
    resetCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      <ToastContainer />
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
