// import { Link } from "react-router-dom";

// const OrderCard = ({ order }) => {
//     console.log(order);
//   const handleClick = (id) => {
//     console.log("clicked on id: ", id);
//   };

//   return (
//     <div className="bg-white shadow-md flex justify-between rounded-lg p-6 m-4 hover:shadow-lg transition">
//       <div>
//         <h3 className="text-xl font-semibold">Order Table: {order.table?.number}</h3>
//         {/* <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p> */}
//         <p className="text-gray-600">Status: {order.status}</p>
//         <p className="text-gray-500">Total: {order.total}$</p>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import api from "../utils/api";

const OrderCard = ({ order, onCancel }) => {
  const handleCancel = async () => {
    try {
      await api.patch(`/orders/${order._id}`, {
        status: "cancelled",
      });
      if (onCancel) onCancel(order._id);
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };

  return (
    <div className="bg-white shadow-md flex justify-between rounded-lg p-6 m-4 hover:shadow-lg transition">
      <div>
        <h3 className="text-xl font-semibold">Table {order.table?.number}</h3>
        <p className="text-gray-600">Status: {order.status}</p>
        <p className="text-gray-500">
          Reserved At: {new Date(order.createdAt).toLocaleString()}
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          {order.items.map((item, i) => (
            <li key={i}>
              {item.menuItem?.name} × {item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">Total: ${order.total}</p>
      </div>

      {order.status === "pending" && (
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-start"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderCard;
