import { Link } from "react-router-dom";

const InventoryCard = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
      {/* <div className="flex justify-around gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-center">
        <div className="">
          {" "}
          <h3 className="text-xl font-semibold">{item.name}</h3>{" "}
          {/* <p className="text-gray-600">{new Date(item.date).toLocaleDateString()}</p> */}
          <p className="text-gray-600">{item.quantity}</p>{" "}
          <p className="text-gray-500">{item.unit}</p>{" "}
          {/* <p className="text-gray-500">{item.quantity}</p> */}
          <p className="text-gray-500">
            {item.quantity <= item.minThreshold ? "Low Stock" : "In Stock"}
          </p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleEdit(item)}
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
