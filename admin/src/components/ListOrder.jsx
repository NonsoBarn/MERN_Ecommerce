import { useEffect, useState } from "react";

const ListOrder = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/getallorders"
      );
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  console.log(allOrders);

  return (
    <div className="p-2 box-border bg-white mb-0 rounded-sm w-full mt-5 lg:ml-5">
      <h4 className="bold-22 p-5 uppercase">Orders List</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12">
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Shipping Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) =>
              order.products.map((product, i) => (
                <tr
                  key={`${order._id}-${product.id}-${i}`}
                  className="border-b border-slate-900/20 text-gray-20 p-6 medium-16"
                >
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.price}</td>
                  {i === 0 && (
                    <>
                      <td className="p-2" rowSpan={order.products.length}>
                        {`${order.userId.slice(0, 6)}...`}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {`${order.shipping.name.slice(0, 6)}...`}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {`${order.shipping.email.slice(0, 6)}...`}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {"N/A"}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {order.shipping.phone || "N/A"}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2" rowSpan={order.products.length}>
                        {order.delivery_status}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrder;
