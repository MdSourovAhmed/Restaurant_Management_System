import React, { useContext, useState } from "react";
import { Navigate, Link } from 'react-router-dom';
import MenuManager from "./MenuManager";
import OrderManager from "./OrderManager";
import TableManager from "./TableManager";
import ReservationManager from "./ReservationManager";
import InventoryManager from "./InventoryManager";
import ReportManager from "./ReportManager";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("menu");
  // const { user } = useContext(AuthContext);
  // if (!user || user.role !== "admin") return <Navigate to="/login" />;
  const sections = {
    menu: <MenuManager />,
    orders: <OrderManager />,
    tables: <TableManager />,
    reservations: <ReservationManager />,
    inventory: <InventoryManager />,
    reports: <ReportManager />,
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="max-w-32 sm:max-w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {Object.keys(sections).map((section) => (
              <li key={section}>
                <button
                  className={` text-left text-sm sm:text-lg sm:p-3 md:text-lg py-2 px-2 rounded ${
                    activeSection === section
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-200">{sections[activeSection]}</div>
    </div>
  );
};

export default AdminPanel;
