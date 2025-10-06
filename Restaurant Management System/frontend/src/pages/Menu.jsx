// // import React, { useState, useEffect } from "react";
// // import MenuCard from "../components/MenuCard";

// // const Menu = () => {
// //   const [menuItems, setMenuItems] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/menu")
// //       .then((res) => res.json())
// //       .then((data) => setMenuItems(data))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   return (
// //     <div className="container bg-gray-100 mx-auto mt-6 sm:mt-6 p-4 rounded-lg shadow-sm">
// //       {/* <div className="bg-gray-200 p-6 rounded-lg shadow-md mx-auto max-w-7xl mt-6"> */}
// //       <h2 className="text-2xl text-teal-400 font-semibold mb-4">Menu</h2>
// //       <div className="container mx-auto">
// //           {menuItems &&
// //         <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">

// //           (
// //             menuItems.map((item) => <MenuCard item={item} key={item._id} />)
// //         </div>
// //           ) : (
// //             <div>No Menu Items Found</div>
// //           )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Menu;

// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import MenuCard from "../components/MenuCard";

// const Menu = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [menuCat, setmenuCat] = useState([]);
//   const [category, setCategory] = useState();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // const fetchMenuItems = async () => {
//     //   try {
//     //     setLoading(true);
//     //     const response = await api.get("/menu");
//     //     setMenuItems(response.data);
//     //     setError("");
//     //   } catch (err) {
//     //     setError(err.response?.data?.message || "Failed to load menu items");
//     //     console.error(err);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//     // fetchMenuItems();

//     const fetchMenuCat = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/menu/categories");
//         console.log(response.data);
//         setmenuCat(response.data);
//         setError("");
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load menu items");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuCat();
//   }, []);

//   const handleCategoryItems = async (cat) => {
//     console.log(cat);
//     try {
//       setLoading(true);
//       setCategory(cat);
//       const response = await api.get(`/menu/${category}`);
//       setMenuItems(response.data);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load menu items");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container max-w-7xl mx-auto mt-6 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-teal-400 mb-6">
//         Our Menu Categories
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
//           {error}
//         </div>
//       ) : menuCat.length > 0 ? (
//         <div className="flex justify-between items-center">
//           <div className="hover:text-teal-300 cursor-pointer" onClick={()=>handleCategoryItems("All")}>All</div>
//           {menuCat.map((cat, ind) => (
//             <div
//               className="hover:text-teal-300 cursor-pointer"
//               key={ind}
//               onClick={()=>handleCategoryItems(cat)}
//             >
//               {cat}
//             </div>
//             // <div className="hover:text-teal-300 cursor-pointer" key={ind} onClick={()=>{setCategory(cat)}}>{cat}</div>

//             // <MenuCard item={item} key={item._id} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600 p-4 bg-gray-200 rounded-lg">
//           No Menu Items Found
//         </div>
//       )}
//       <h2 className="text-2xl font-bold text-teal-400 mb-6">
//         Our {category ? category : "All"} Menu
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
//           {error}
//         </div>
//       ) : menuItems.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {menuItems.map((item) => (
//             <MenuCard item={item} key={item._id} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600 p-4 bg-gray-200 rounded-lg">
//           No Menu Items Found
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get("/menu/categories");
        setCategories(response.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    fetchMenuItems("All");
  }, []);

  // Fetch menu items by category
  const fetchMenuItems = async (category) => {
    try {
      setLoading(true);
      const endpoint = category === "All" ? "/menu" : `/menu/${category}`;
      const response = await api.get(endpoint);
      setMenuItems(response.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchMenuItems(category);
  };

  return (
    <div className="container max-w-7xl mx-auto mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-3xl font-bold text-teal-500 mb-6 text-center">
        Explore Our Menu
      </h2>

      {/* Categories Section */}
      {loading && categories.length === 0 ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["All", ...categories].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-teal-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Menu Items Section */}
      <h3 className="text-2xl font-semibold text-teal-400 mb-4 text-center">
        {selectedCategory === "All"
          ? "All Menu Items"
          : `${selectedCategory} Menu`}
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      ) : menuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 bg-gray-200 p-4 rounded-lg">
          No Menu Items Found
        </div>
      )}
    </div>
  );
};

export default Menu;
