import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from './contexts/AuthContext';
import Navbar from "./components/Navbar";
// import UserRegistrations from './components/UserRegistrations';
import Home from "./pages/Home";

import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
