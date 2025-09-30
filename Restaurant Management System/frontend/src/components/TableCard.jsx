import { Link } from "react-router-dom";

const TableCard = ({ table }) => {
  const handleClick = (id) => {
    console.log("clicked on id: ", id);
  };

  return (
    <div className="bg-white shadow-md flex justify-between rounded-lg p-6 m-4 hover:shadow-lg transition">
      <div>
        <h3 className="text-xl font-semibold">{table.number}</h3>
        {/* <p className="text-gray-600">{new Date(table.date).toLocaleDateString()}</p> */}
        <p className="text-gray-600">{table.capacity}</p>
        <p className="text-gray-500">{table.status}</p>
      </div>
      <div className="mt-4">
        <button
          className="bg-teal-300 p-2 w-full h-10 rounded-lg cursor-pointer text-white"
          onClick={() => handleClick(table._id)}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default TableCard;
