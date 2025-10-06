// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import OrderForm from "./OrderForm";
// import OrderCard from "../components/OrderCard";
// import Modal from "../components/Modal";

// const Orders = () => {
//   const { user } = useContext(AuthContext);

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       console.log(user);
//       // const res = await axios.get("http://localhost:5000/api/orders");
//       const response = await api.get(`/orders/${user.id}`);
//       // const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
//       setOrders(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!user) navigate("/login");
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
//       <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">
//         Wellcome, {user?user.id:"No name Provided"}
//       </h2>
//       <h2 className="text-2xl text-teal-500 font-semibold mb-6 text-center">
//         Your Orders
//       </h2>

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
//         <OrderForm
//           fetchOrders={fetchOrders}
//           onClose={() => setShowForm(false)}
//         />
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
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import OrderForm from "./OrderForm";
import OrderCard from "../components/OrderCard";
import Modal from "../components/Modal";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/orders/${user.id}`);
        setOrders(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleCancel = (cancelledId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === cancelledId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  return (
    <div className="container max-w-7xl mx-auto bg-gray-100 relative p-6 mt-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-semibold text-teal-600 mb-2">
          Welcome, {user?.name || user?.id || "Guest"}
        </h1>
        <p className="text-gray-600 mb-4 text-lg">Manage your orders below</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          + Place New Order
        </button>
      </div>

      {/* Order creation modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">New Order</h3>
        <OrderForm fetchOrders={() => fetchOrders()} onClose={() => setShowForm(false)} />
      </Modal>

      {/* Display orders */}
      {loading ? (
        <p className="text-center text-gray-600 animate-pulse">Loading your orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg mb-2">You haven’t placed any orders yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-500 hover:underline"
          >
            Create your first order
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
