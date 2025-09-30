import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminPanel from "./pages/AdminPanel";
import Menu from "./pages/MenuManager";
import Tables from "./pages/TableManager";
import Orders from "./pages/OrderManager";

// import Registrations from "./pages/Registrations";
// import Events from "./pages/Events";
// import EventManagement from "./pages/EventManagement"; // New
// import UserManagement from "./pages/UserManagement"; // New
// import RegistrationManagement from "./pages/RegistrationManagement"; // New

// import EventList from "./components/EventList";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />{" "}
            {/* New */}
            <Route path="/admin/menu" element={<Menu />} /> {/* New */}
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin/orders" element={<Orders />} />
            {/* New */}
            {/* <Route path="/registrations" element={<Registrations />} />
            <Route path="/events" element={<Events />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Registrations from "./pages/Registrations";
// import Quiz from "./pages/QuizPage";
// import Dashboard from "./pages/DashboardPage";
// import Chapters from "./pages/Chapters";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// // import quranicBg from './assets/quranic-bg.jpg'; // Adjust path as needed
// import quranicBg from "./assets/bg2.jpg"; // Adjust path as needed

// function App() {
//   useEffect(() => {
//     console.log("App Rendered: Global Background = quranic-bg");
//   }, []);

//   return (
//     <AuthProvider>
//       {/* <div
//         className="min-h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${quranicBg})`,
//         }}
//       > */}
//       <BrowserRouter>
//         <Navbar />
//         <div className="container mx-auto p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg min-h-[calc(100vh-4rem)]">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/Registrations" element={<Registrations />} />
//             <Route path="/quiz" element={<Quiz />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/chapters" element={<Chapters />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//       {/* </div> */}
//     </AuthProvider>
//   );
// }

// export default App;
