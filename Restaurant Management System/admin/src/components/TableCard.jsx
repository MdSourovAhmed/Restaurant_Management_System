// import { Link } from "react-router-dom";

// const TableCard = ({ table, handleDelete, handleEdit }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
//       {/* <div className="flex  justify-around gap-4"> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-center">
//         <div className="">
//           {" "}
//           <h3 className="text-xl font-semibold">
//             Table Number: {table?.number}
//           </h3>{" "}
//           <p className="text-gray-600">Capacity: {table?.capacity}</p>{" "}
//           <p className="text-gray-600">Status: {table?.status}</p>{" "}
//         </div>
//         <div className="space-y-2 mt-6">
//           <button
//             onClick={() => handleEdit(table)}
//             className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(table._id)}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableCard;







const TableCard = ({ table, handleDelete, handleEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Table {table?.number}</h3>
          <p className="text-gray-600">Capacity: {table?.capacity}</p>
          <p className="text-gray-600 capitalize">Status: {table?.status || "available"}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => handleEdit(table)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(table._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
