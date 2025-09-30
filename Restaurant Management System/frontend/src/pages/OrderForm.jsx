// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderForm = ({ fetchOrders }) => {
//   const [tables, setTables] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [formData, setFormData] = useState({
//     tableId: '',
//     items: [{ menuItem: '', quantity: 1 }],
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tables/availability');
//         setTables(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/menu');
//         setMenuItems(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchTables();
//     fetchMenuItems();
//   }, []);

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     if (name === 'tableId') {
//       setFormData({ ...formData, tableId: value });
//     } else {
//       const updatedItems = [...formData.items];
//       updatedItems[index] = { ...updatedItems[index], [name]: value };
//       setFormData({ ...formData, items: updatedItems });
//     }
//   };

//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { menuItem: '', quantity: 1 }],
//     });
//   };

//   const removeItem = (index) => {
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: updatedItems });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/orders', formData);
//       setSuccess('Order placed successfully!');
//       setFormData({ tableId: '', items: [{ menuItem: '', quantity: 1 }] });
//       fetchOrders();
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6 space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Select Table</label>
//         <select
//           name="tableId"
//           value={formData.tableId}
//           onChange={handleInputChange}
//           className="mt-1 block w-full border rounded p-2"
//           required
//         >
//           <option value="">Select a table</option>
//           {tables.map(table => (
//             <option key={table._id} value={table._id}>
//               Table {table.number} (Capacity: {table.capacity})
//             </option>
//           ))}
//         </select>
//       </div>
//       {formData.items.map((item, index) => (
//         <div key={index} className="flex space-x-4 items-end">
//           <div className="flex-1">
//             <label className="block text-sm font-medium">Menu Item</label>
//             <select
//               name="menuItem"
//               value={item.menuItem}
//               onChange={(e) => handleInputChange(e, index)}
//               className="mt-1 block w-full border rounded p-2"
//               required
//             >
//               <option value="">Select an item</option>
//               {menuItems.map(menuItem => (
//                 <option key={menuItem._id} value={menuItem._id}>
//                   {menuItem.name} (${menuItem.price})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={item.quantity}
//               onChange={(e) => handleInputChange(e, index)}
//               min="1"
//               className="mt-1 block w-24 border rounded p-2"
//               required
//             />
//           </div>
//           {formData.items.length > 1 && (
//             <button
//               type="button"
//               onClick={() => removeItem(index)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       ))}
//       <div className="flex space-x-4">
//         <button
//           type="button"
//           onClick={addItem}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Item
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Place Order
//         </button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </form>
//   );
// };

// export default OrderForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderPage = () => {
//   const [tables, setTables] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [formData, setFormData] = useState({
//     tableId: '',
//     items: [{ menuItem: '', quantity: 1 }],
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tables/availability');
//         setTables(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load tables');
//       }
//     };

//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/menu');
//         setMenuItems(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load menu items');
//       }
//     };

//     fetchTables();
//     fetchMenuItems();
//   }, []);

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     if (name === 'tableId') {
//       setFormData({ ...formData, tableId: value });
//     } else {
//       const updatedItems = [...formData.items];
//       updatedItems[index] = { ...updatedItems[index], [name]: value };
//       setFormData({ ...formData, items: updatedItems });
//     }
//   };

//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { menuItem: '', quantity: 1 }],
//     });
//   };

//   const removeItem = (index) => {
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: updatedItems });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/orders', formData);
//       setSuccess('Order placed successfully!');
//       setFormData({ tableId: '', items: [{ menuItem: '', quantity: 1 }] });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to place order');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Place an Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Select Table</label>
//           <select
//             name="tableId"
//             value={formData.tableId}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="">Select a table</option>
//             {tables.map(table => (
//               <option key={table._id} value={table._id}>
//                 Table {table.number} (Capacity: {table.capacity})
//               </option>
//             ))}
//           </select>
//         </div>
//         {formData.items.map((item, index) => (
//           <div key={index} className="flex space-x-4 items-end">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700">Menu Item</label>
//               <select
//                 name="menuItem"
//                 value={item.menuItem}
//                 onChange={(e) => handleInputChange(e, index)}
//                 className="mt-1 block w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Select an item</option>
//                 {menuItems.map(menuItem => (
//                   <option key={menuItem._id} value={menuItem._id}>
//                     {menuItem.name} (${menuItem.price})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={item.quantity}
//                 onChange={(e) => handleInputChange(e, index)}
//                 min="1"
//                 className="mt-1 block w-24 border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//             {formData.items.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeItem(index)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//         <div>
//         <label className="block text-sm font-medium">Reservation Time</label>
//         <input
//           type="datetime-local"
//           value={formData.reservationTime}
//           onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
//           className="mt-1 block w-full border rounded p-2"
//           required
//         />
//       </div>
//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={addItem}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Item
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Place Order
//           </button>
//         </div>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {success && <p className="text-green-500 text-center">{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default OrderPage;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import api from "../utils/api";

const OrderForm = () => {
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    tableId: "",
    items: [{ menuItem: "", quantity: 1 }],
    reservationTime: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTables = async () => {
      console.log(user);
      try {
        // const response = await axios.get(
        //   "http://localhost:5000/api/tables/availability"
        // );
        const response = await api.get("/tables/availability");
        setTables(response.data);
      } catch (err) {
        setError("Failed to load tables");
      }
    };

    const fetchMenuItems = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/menu");
        const response = await api.get("/menu");
        setMenuItems(response.data);
      } catch (err) {
        setError("Failed to load menu items");
      }
    };

    fetchTables();
    fetchMenuItems();
  }, [user]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tableId" || name === "reservationTime") {
      setFormData({ ...formData, [name]: value });
    } else {
      const updatedItems = [...formData.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { menuItem: "", quantity: 1 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const menuItem = menuItems.find((m) => m._id === item.menuItem);
      return sum + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   const orderPayload = {
  //     tableId: formData.tableId,
  //     items: formData.items,
  //     total: calculateTotal(),
  //     reservationTime: formData.reservationTime,
  //   };

  //   try {
  //     await axios.post("http://localhost:5000/api/orders", orderPayload);
  //     setSuccess("Order placed successfully!");
  //     setFormData({ tableId: "", items: [{ menuItem: "", quantity: 1 }], reservationTime: "" });
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to place order");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const orderPayload = {
      tableId: formData.tableId,
      items: formData.items,
      total: calculateTotal(),
      userId: user?.id,
      reservationTime: formData.reservationTime,
    };
    console.log(orderPayload);

    try {
      await api.post("/orders", orderPayload);
      setSuccess("Order placed successfully!");
      setFormData({
        tableId: "",
        items: [{ menuItem: "", quantity: 1 }],
        reservationTime: "",
      });
      if (fetchOrders) fetchOrders();
      if (onClose) onClose(); // close modal/form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Place an Order</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Table Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Table
          </label>
          <select
            name="tableId"
            value={formData.tableId}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a table</option>
            {tables.map((table) => (
              <option key={table._id} value={table._id}>
                Table {table.number} (Capacity: {table.capacity})
              </option>
            ))}
          </select>
        </div>

        {/* Items */}
        {formData.items.map((item, index) => (
          <div key={index} className="flex space-x-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Menu Item
              </label>
              <select
                name="menuItem"
                value={item.menuItem}
                onChange={(e) => handleInputChange(e, index)}
                className="mt-1 block w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select an item</option>
                {menuItems.map((menuItem) => (
                  <option key={menuItem._id} value={menuItem._id}>
                    {menuItem.name} (${menuItem.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleInputChange(e, index)}
                min="1"
                className="mt-1 block w-24 border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {formData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Reservation Time */}
        <div>
          <label className="block text-sm font-medium">Reservation Time</label>
          <input
            type="datetime-local"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        {/* Total */}
        <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
