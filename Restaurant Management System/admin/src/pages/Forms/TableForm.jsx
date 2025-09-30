// import React, { useState, useEffect } from "react";
// import api from "../../utils/api";

// const TableForm = ({ fetchTables, editingTable, setEditingTable }) => {
//   const [formData, setFormData] = useState({
//     number: "",
//     capacity: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     if (editingTable) {
//       setFormData({
//         number: editingTable.number,
//         capacity: editingTable.capacity,
//       });
//     }
//   }, [editingTable]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       const path = editingTable ? `/tables/${editingTable?._id}` : "/tables";
//       const method = editingTable ? "patch" : "post";
//       const response = await api[method](path, formData);
//       setSuccess(editingTable ? "Table updated!" : "Table created!");
//       setFormData({ number: "", capacity: "" });
//       setEditingTable(null);
//       fetchTables();
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className=" mb-6 space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Table Number</label>
//         <input
//           type="number"
//           value={formData.number}
//           onChange={(e) => setFormData({ ...formData, number: e.target.value })}
//           className="mt-1 block w-full border rounded p-2"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium">Capacity</label>
//         <input
//           type="number"
//           value={formData.capacity}
//           onChange={(e) =>
//             setFormData({ ...formData, capacity: e.target.value })
//           }
//           className="mt-1 block w-full border rounded p-2"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         {editingTable ? "Update Table" : "Add Table"}
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </form>
//   );
// };

// export default TableForm;

import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const TableForm = ({ fetchTables, editingTable, setEditingTable }) => {
  const [formData, setFormData] = useState({ number: "", capacity: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTable) {
      setFormData({
        number: editingTable.number,
        capacity: editingTable.capacity,
      });
    }
  }, [editingTable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const path = editingTable ? `/tables/${editingTable._id}` : "/tables";
      const method = editingTable ? "patch" : "post";

      await api[method](path, formData);

      setSuccess(
        editingTable ? "Table updated successfully!" : "Table created!"
      );
      setFormData({ number: "", capacity: "" });
      setEditingTable(null);
      fetchTables();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save table");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium">Table Number</label>
        <input
          type="number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Capacity</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded text-white ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {submitting ? "Saving..." : editingTable ? "Update Table" : "Add Table"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default TableForm;
