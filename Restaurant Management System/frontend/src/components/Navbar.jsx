import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="mx-auto text-gray-500 p-4 bg-white sticky top-0 z-30 shadow-md">
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-teal-400">
          Let's Savor
        </Link>
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
        {/* <div className="space-x-4"> */}
        <div className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/"
              className="text-teal-400 dark:text-gray-300 hover:text-teal-300"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-teal-400 dark:text-gray-300 hover:text-teal-300"
            >
              Menu
            </Link>
            <Link
              to="/tables"
              className="text-teal-400 dark:text-gray-300 hover:text-teal-300"
            >
              Tables
            </Link>
            <Link
              to="/orders"
              className="text-teal-400 dark:text-gray-300 hover:text-teal-300"
            >
              Order
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">Event Registration</Link>
//         <div className="space-x-4">
//           <Link to="/events" className="hover:text-gray-200">Events</Link>
//           {user ? (
//             <>
//               <Link to="/my-registrations" className="hover:text-gray-200">My Registrations</Link>
//               {user.role === 'admin' && (
//                 <Link to="/admin" className="hover:text-gray-200">Admin Panel</Link>
//               )}
//               <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-gray-200">Login</Link>
//               <Link to="/signup" className="hover:text-gray-200">Signup</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
