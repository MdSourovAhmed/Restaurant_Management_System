// import React, { useState, useEffect } from "react";
// import MenuCard from "../components/MenuCard";

// const Menu = () => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/menu")
//       .then((res) => res.json())
//       .then((data) => setMenuItems(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="container bg-gray-100 mx-auto mt-6 sm:mt-6 p-4 rounded-lg shadow-sm">
//       {/* <div className="bg-gray-200 p-6 rounded-lg shadow-md mx-auto max-w-7xl mt-6"> */}
//       <h2 className="text-2xl text-teal-400 font-semibold mb-4">Menu</h2>
//       <div className="container mx-auto">
//           {menuItems &&
//         <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
          
//           (
//             menuItems.map((item) => <MenuCard item={item} key={item._id} />)
//         </div>
//           ) : (
//             <div>No Menu Items Found</div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default Menu;



import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await api.get('/menu');
        setMenuItems(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-6 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-teal-400 mb-6">Our Menu</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
          {error}
        </div>
      ) : menuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 p-4 bg-gray-200 rounded-lg">
          No Menu Items Found
        </div>
      )}
    </div>
  );
};

export default Menu;