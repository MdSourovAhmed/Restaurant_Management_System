// // import React, { useState, useEffect } from "react";
// // import OrderForm from "./OrderForm"; // make sure this is the polished version
// // import OrderCard from "../components/OrderCard";

// // const Orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const res = await fetch("http://localhost:5000/api/orders");
// //       const data = await res.json();
// //       setOrders(data);
// //     } catch (err) {
// //       setError("Failed to load orders");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const handleCancel = (cancelledId) => {
// //     // Optimistically update UI without full reload
// //     setOrders((prev) =>
// //       prev.map((order) =>
// //         order._id === cancelledId ? { ...order, status: "cancelled" } : order
// //       )
// //     );
// //   };

// //   return (
// //     <div className="container max-w-7xl bg-gray-100 mx-auto relative p-6 mt-6 rounded-lg">
// //       <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">
// //         Your Orders
// //       </h2>

// //       {/* Order Form */}
// //       <div className="mb-10">
// //         <OrderForm fetchOrders={fetchOrders} />
// //       </div>

// //       {/* Orders Grid */}
// //       {loading ? (
// //         <p className="text-center text-gray-600">Loading orders...</p>
// //       ) : error ? (
// //         <p className="text-center text-red-500">{error}</p>
// //       ) : orders.length === 0 ? (
// //         <p className="text-center text-gray-500">No orders yet.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// //           {orders.map((order) => (
// //             <OrderCard order={order} key={order._id} onCancel={handleCancel} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;

// import React, { useState, useEffect } from "react";
// import OrderForm from "./OrderForm";
// import OrderCard from "../components/OrderCard";
// import Modal from "../components/Modal"; // import modal

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch("http://localhost:5000/api/orders");
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       setError("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleCancel = (cancelledId) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order._id === cancelledId ? { ...order, status: "cancelled" } : order
//       )
//     );
//   };

//   return (
//     <div className="container max-w-7xl bg-gray-100 mx-auto relative p-6 mt-6 rounded-lg">
//       <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">Your Orders</h2>

//       {/* Button to toggle modal */}
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Place an Order
//         </button>
//       </div>

//       {/* OrderForm inside Modal */}
//       <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">New Order</h3>
//         <OrderForm fetchOrders={fetchOrders} onClose={() => setShowForm(false)} />
//       </Modal>

//       {/* Orders Grid */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading orders...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {orders.map((order) => (
//             <OrderCard order={order} key={order._id} onCancel={handleCancel} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import OrderForm from "./OrderForm";
import OrderCard from "../components/OrderCard";
import Modal from "../components/Modal";

const Orders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(user);
      // const res = await axios.get("http://localhost:5000/api/orders");
      const response = await api.get(`/orders/${user.id}`);
      // const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    fetchOrders();
  }, []);

  const handleCancel = (cancelledId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === cancelledId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  return (
    <div className="container max-w-7xl bg-gray-100 mx-auto relative p-6 mt-6 rounded-lg">
      <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">
        Wellcome, {user?user.id:"No name Provided"}
      </h2>
      <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">
        Your Orders
      </h2>

      {/* Button to toggle modal */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Place an Order
        </button>
      </div>

      {/* OrderForm inside Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">New Order</h3>
        <OrderForm
          fetchOrders={fetchOrders}
          onClose={() => setShowForm(false)}
        />
      </Modal>

      {/* Orders Grid */}
      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
