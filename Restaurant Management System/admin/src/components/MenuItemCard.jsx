import { Link } from "react-router-dom";

const MenuItemCard = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-around items-center">
        <div className="">
          {" "}
          <h3 className="text-lg font-semibold text-gray-800">
            {item.name}
          </h3>{" "}
          <p className="text-gray-600 text-sm">${item.price}</p>{" "}
          <p className="text-gray-500 text-xs uppercase tracking-wide">
            {item.category}
          </p>{" "}
        </div>
        <div className="space-y-1">
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

export default MenuItemCard;
