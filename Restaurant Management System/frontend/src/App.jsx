import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from './contexts/AuthContext';
import Navbar from "./components/Navbar";
// import UserRegistrations from './components/UserRegistrations';
import Home from "./pages/Home";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/events/:id" element={<EventPage />} />
//           <Route path="/my-registrations" element={<MyRegistrations />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/recover-username" element={<RecoverUsername />} />
//           <Route path="/admin" element={<AdminDashboard />} /> {/* New */}
//           <Route path="/admin/events" element={<EventManagement />} /> {/* New */}
//           <Route path="/admin/users" element={<UserManagement />} /> {/* New */}
//           <Route path="/admin/registrations" element={<RegistrationManagement />} /> {/* New */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

// import React from 'react';
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Inventory from "./components/Inventory";
// import Reservations from "./components/Reservations";
// import Reports from "./components/Reports";
import OrderForm from "./pages/OrderForm";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/orders" element={<Orders />} />

          {/* <Inventory />
        <Reservations />
        <Reports /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
