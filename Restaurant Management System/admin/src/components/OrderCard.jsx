import { Link } from "react-router-dom";

const statusOptions = [
  "pending",
  "preparing",
  "served",
  "completed",
  "cancelled",
];

const OrderCard = ({ order, handleDelete, handleUpdateStatus }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        {/* Table Info */}
        <div>
          <h4 className="text-gray-500 text-sm font-medium">Table</h4>
          <p className="text-xl font-semibold">{order.table?.number}</p>
        </div>

        {/* Items */}
        <div>
          <h4 className="text-gray-500 text-sm font-medium">Items</h4>
          <ul className="text-gray-700 text-sm space-y-1">
            {order.items.map((item) => (
              <li key={item.menuItem?._id}>
                {item.menuItem?.name}{" "}
                <span className="font-medium">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-gray-500 text-sm font-medium">Status</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleUpdateStatus(order._id, status)}
                className={`px-3 py-1 rounded text-sm capitalize transition ${
                  order.status === status
                    ? "bg-teal-500 text-white animate-pulse"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div>
          <h4 className="text-gray-500 text-sm font-medium">Total</h4>
          <p className="text-lg font-semibold text-gray-800">${order.total}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-start lg:justify-end">
          <button
            onClick={() => handleEdit(order)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(order._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
