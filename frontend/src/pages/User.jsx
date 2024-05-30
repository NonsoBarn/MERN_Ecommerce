import { useState, useEffect } from "react";
import { MdOutlineLocalPhone, MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
// import { FaHeart } from "react-icons/fa";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/getuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setUserData(result.user);
          fetchUserOrders(result.user._id); // Fetch user orders after fetching user data
        } else {
          console.error("Failed to fetch user data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/user/${userId}`
      );
      const data = await response.json();
      setUserOrders(data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-padd-container py-12 xl:pb-72 xl:pt-40">
      <div className="mx-20 grid">
        <div className="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6">
          <div className="relative">
            <img
              className="w-20 h-20 rounded-md"
              src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg"
              alt="User"
            />
          </div>
          <div className="flex flex-col px-6">
            <div className="flex h-8 flex-row">
              <h2 className="text-lg font-semibold">{userData.username}</h2>
            </div>
            <div className="my-2 flex flex-row space-x-2">
              <div className="flex flex-row">
                <FaLocationDot
                  className="mr-2 h-4 w-4 fill-gray-500/80"
                  width={24}
                  height={24}
                />
                <div className="text-xs text-gray-400/80 hover:text-gray-400">
                  {userData.address}
                </div>
              </div>
              <div className="flex flex-row">
                <MdEmail
                  className="mr-2 h-4 w-4 fill-gray-500/80"
                  width={24}
                  height={24}
                />
                <div className="text-xs text-gray-400/80 hover:text-gray-400">
                  {userData.email}
                </div>
              </div>
              <div className="flex flex-row">
                <MdOutlineLocalPhone
                  className="mr-2 h-4 w-4 fill-gray-500/80"
                  width={24}
                  height={24}
                />
                <div className="text-xs text-gray-400/80 hover:text-gray-400">
                  +234{userData.phone}
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-row items-center space-x-5">
              <a
                href="#"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
              >
                <div className="flex flex-row items-center justify-center">
                  <TbTruckDelivery
                    className="mr-3 fill-gray-500/95"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold text-gray-600">
                    {userOrders.length}{" "}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-400">Orders</div>
              </a>
              {/* <a
                href="#"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
              >
                <div className="flex flex-row items-center justify-center">
                  <FaHeart
                    className="mr-3 fill-gray-500/95"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold text-gray-600"> 45 </span>
                </div>
                <div className="mt-2 text-sm text-gray-400">Liked</div>
              </a> */}
            </div>
          </div>
        </div>

        {/* Display User Orders */}
        <div className="my-8">
          <div className="overflow-x-auto">
            <table className="table-auto w-full ">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Products</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Date Placed</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2 ">
                      <ul>
                        {order.products.map((product) => (
                          <li key={product._id}>
                            {product.name} - Quantity: {product.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">{order.total}</td>

                    <td className="border px-4 py-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {order.delivery_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
