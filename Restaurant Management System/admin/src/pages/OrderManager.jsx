// import React, { useState, useEffect } from "react";
// import api from "api";
// import OrderForm from "./OrderForm";
// import OrderCard from "./OrderCard";

// const OrderManager = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // const fetchOrders = async () => {
//     //   try {
//     //     const response = await api.get("http://localhost:5000/api/orders");
//     //     setOrders(response.data);
//     //   } catch (err) {
//     //     console.error(err);
//     //   }
//     // };
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await api.get("http://localhost:5000/api/orders");
//       setOrders(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const fetchOrders = async () => {
//   //   try {
//   //     const response = await api.get("http://localhost:5000/api/orders");
//   //     setOrders(response.data);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       await api.patch(`http://localhost:5000/api/orders/${id}`, { status });
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`http://localhost:5000/api/orders/${id}`);
//       setOrders(orders.filter((order) => order._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Order Management</h2>
//       <OrderForm fetchOrders={fetchOrders} />
//       <div>
//         {orders.map((order) => (
//           <OrderCard
//             order={order}
//             key={order._id}
//             handleDelete={handleDelete}
//             handleUpdateStatus={handleUpdateStatus}
//           />
//         ))}
//       </div>
//       {/* <div className="mt-6"> */}
//       {/* <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-3">Table</th>
//               <th className="border p-3">Items</th>
//               <th className="border p-3">Status</th>
//               <th className="border p-3">Total</th>
//               <th className="border p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order._id} className="border-b">
//                 <td className="border p-3">{order.table?.number}</td>
//                 <td className="border p-3">
//                   {order.items.map(item => (
//                     <span key={item.menuItem._id}>
//                       {item.menuItem.name} (x{item.quantity})
//                     </span>
//                   ))}
//                 </td>
//                 <td className="border p-3">
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                     className="border rounded p-1"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="preparing">Preparing</option>
//                     <option value="served">Served</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td className="border p-3">${order.total}</td>
//                 <td className="border p-3">
//                   <button
//                     onClick={() => handleDelete(order._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table> */}
//       {/* </div> */}
//     </div>
//   );
// };

// export default OrderManager;

// import React, { useState, useEffect } from "react";
// import api from "api";
// import OrderForm from "./OrderForm";
// import OrderCard from "./OrderCard";

// const OrderManager = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await api.get("http://localhost:5000/api/orders");
//       setOrders(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       await api.patch(`http://localhost:5000/api/orders/${id}`, { status });
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`http://localhost:5000/api/orders/${id}`);
//       setOrders(orders.filter((order) => order._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (order) => {
//     console.log("Edit order:", order);
//     // Add modal or edit form here
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Order Management</h2>

//       <OrderForm fetchOrders={fetchOrders} />

//       {/* Headers */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-3 bg-gray-100 rounded-lg mt-6 font-semibold text-gray-700">
//         <div>Table</div>
//         <div>Items</div>
//         <div>Status</div>
//         <div>Total</div>
//         <div className="text-right">Actions</div>
//       </div>

//       {/* Order List */}
//       <div>
//         {orders.map((order) => (
//           <OrderCard
//             order={order}
//             key={order._id}
//             handleDelete={handleDelete}
//             handleUpdateStatus={handleUpdateStatus}
//             handleEdit={handleEdit}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderManager;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import OrderForm from "./Forms/OrderForm";
import OrderCard from "../components/OrderCard";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (order) => {
    console.log("Edit order:", order);
    // Add modal or edit form here
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>

      <OrderForm fetchOrders={fetchOrders} />

      {/* Order List with alternating row colors */}
      <div>
        {orders.map((order, index) => (
          <OrderCard
            order={order}
            key={order._id}
            handleDelete={handleDelete}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderManager;

// import React, { useState, useEffect } from "react";
// import api from "api";
// import OrderForm from "./OrderForm";
// import OrderCard from "./OrderCard";

// const OrderManager = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("http://localhost:5000/api/orders");
//       setOrders(response.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       setLoading(true);
//       await api.patch(`http://localhost:5000/api/orders/${id}`, { status });
//       await fetchOrders();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       await api.delete(`http://localhost:5000/api/orders/${id}`);
//       await fetchOrders();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (order) => {
//     console.log("Edit order:", order);
//     // Add API call for editing if needed
//     await fetchOrders();
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Order Management</h2>

//       <OrderForm fetchOrders={fetchOrders} />

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center py-10">
//           <div className="w-10 h-10 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <div>
//           {orders.map((order, index) => (
//             <div
//               key={order._id}
//               className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//             >
//               <OrderCard
//                 order={order}
//                 handleDelete={handleDelete}
//                 handleUpdateStatus={handleUpdateStatus}
//                 handleEdit={handleEdit}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManager;
