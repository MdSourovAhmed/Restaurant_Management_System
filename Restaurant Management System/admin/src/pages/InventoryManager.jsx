import React, { useState, useEffect } from "react";
import api from "../utils/api";
import InventoryForm from "./Forms/InventoryForm";
import InventoryCard from "../components/InventoryCard";

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get("/inventory");
      setInventory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      setInventory(inventory.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Inventory Management</h2>
      <InventoryForm
        fetchInventory={fetchInventory}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {inventory.map((item) => (
          <InventoryCard
            item={item}
            key={item._id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Inventory Management</h2>
//       <InventoryForm fetchInventory={fetchInventory} editingItem={editingItem} setEditingItem={setEditingItem} />
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-3">Name</th>
//             <th className="border p-3">Quantity</th>
//             <th className="border p-3">Unit</th>
//             <th className="border p-3">Status</th>
//             <th className="border p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map(item => (
//             <tr key={item._id} className="border-b">
//               <td className="border p-3">{item.name}</td>
//               <td className="border p-3">{item.quantity}</td>
//               <td className="border p-3">{item.unit}</td>
//               <td className="border p-3">{item.quantity <= item.minThreshold ? 'Low Stock' : 'In Stock'}</td>
//               <td className="border p-3">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default InventoryManager;
