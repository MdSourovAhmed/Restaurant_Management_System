// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import TableCard from "../components/TableCard";
// import TableForm from "./Forms/TableForm";

// const TableManager = () => {
//   const [tables, setTables] = useState([]);
//   const [editingTable, seteditingTable] = useState([null]);

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   const fetchTables = async () => {
//     try {
//       const response = await api.get("/tables");
//       setTables(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const handleEdit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await api.post("/tables", editingTable);
//   //     seteditingTable({ number: "", capacity: "" });
//   //     fetchTables();
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/tables/${id}`);
//       setTables(tables.filter((table) => table._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (table) => {
//     seteditingTable(table);
//   };

//   return (
//     // <div className="container mx-auto p-6 max-w-7xl bg-gray-50 rounded-lg">
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Table Management</h2>
//       <TableForm
//         fetchTables={fetchTables}
//         editingTable={editingTable}
//         seteditingTable={seteditingTable}
//       />
//       {/* <form onSubmit={handleEdit} className="mb-6 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Table Number</label>
//           <input
//             type="number"
//             value={editingTable.number}
//             onChange={(e) =>
//               seteditingTable({ ...editingTable, number: e.target.value })
//             }
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Capacity</label>
//           <input
//             type="number"
//             value={editingTable.capacity}
//             onChange={(e) =>
//               seteditingTable({ ...editingTable, capacity: e.target.value })
//             }
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Table
//         </button>
//       </form> */}
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {tables.map((table) => (
//           <TableCard
//             table={table}
//             key={table._id}
//             handleDelete={handleDelete}
//             handleEdit={handleEdit}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableManager;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import TableCard from "../components/TableCard";
import TableForm from "./Forms/TableForm";

const TableManager = () => {
  const [tables, setTables] = useState([]);
  const [editingTable, setEditingTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTables = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/tables");
      setTables(response.data);
    } catch (err) {
      setError("Failed to load tables");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tables/${id}`);
      setTables((prev) => prev.filter((table) => table._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete table");
    }
  };

  const handleEdit = (table) => {
    setEditingTable(table);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl bg-gray-50 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Table Management
      </h2>

      {/* Form for add/update */}
      <TableForm
        fetchTables={fetchTables}
        editingTable={editingTable}
        setEditingTable={setEditingTable}
      />

      {/* Error/Loading States */}
      {loading && (
        <p className="text-center text-gray-600">Loading tables...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tables.length > 0
          ? tables.map((table) => (
              <TableCard
                key={table._id}
                table={table}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          : !loading && (
              <p className="text-center text-gray-500">No tables found.</p>
            )}
      </div>
    </div>
  );
};

export default TableManager;
