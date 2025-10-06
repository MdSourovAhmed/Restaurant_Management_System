// import { Link } from "react-router-dom";
// import Img from "../assets/bg2.jpg";
// import { useState } from "react";

// const MenuCard = ({ item }) => {
//   const [val, setVal] = useState(0);

//   const handleClick = (id) => {
//     console.log("clicked on id: ", id);
//   };
//   const add = () => {
//     setVal((prev) => prev + 1);
//     console.log("clicked on add: ");
//   };
//   const minus = () => {
//     val ? setVal((prev) => prev - 1) : 0;
//     console.log("clicked on minus: ");
//   };
//   return (
//     <div className="bg-white shadow-md rounded-lg flex justify-around gap-4 p-6 m-4 hover:shadow-lg transition">
//       <div className="flex-col justify-around">
//         <div className="object-cover h-50 overflow-hidden">
//           <img src={Img} alt="" className=" rounded-sm h-1/1 w-70" />
//         </div>
//         <div className="mt-2">
//           <div className="container mx-auto text-gray-700 items-center">
//             <h3 className="text-xl font-semibold">Item Name: {item.name}</h3>
//             {/* <p className="text-gray-600">{new Date(item.date).toLocaleDateString()}</p> */}
//             <p className="text-gray-600">Price: {item.price}$</p>
//             <p className="text-gray-500">Category: {item.category}</p>
//           </div>
//           {/* <div className="text-gray-500">Add to Cart</div>
//           <div className="flex justify-between w-1/4">
//             <div
//               className="text-teal-400 text-xl cursor-pointer"
//               onClick={() => {add(val)
//               }}
//             >
//               +
//             </div>
//             <div className="text-teal-400 text-xl">{val}</div>
//             <div
//               className="text-teal-400 text-xl cursor-pointer"
//               onClick={() => {
//                 minus(val)
//               }}
//             >
//               -
//             </div>
//           </div> */}
//         </div>
//         {/* </div>
//       <div className="mt-4"> */}
//         {/* <div>
//           <button
//             className="bg-teal-300 px-4 py-2 mt-2 cursor-pointer rounded-lg text-white"
//             onClick={() => handleClick(item._id)}
//           >
//             Order Now
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default MenuCard;

// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext"; // import context
// import Img from "../assets/bg2.jpg";

// const MenuCard = ({ item }) => {
//   const { addToCart } = useContext(AuthContext); // get addToCart function
//   const [quantity, setQuantity] = useState(0);

//   const increment = () => setQuantity((q) => q + 1);
//   const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

//   const handleAddToCart = () => {
//     if (quantity > 0) {
//       addToCart({ ...item, quantity });
//       setQuantity(0); // reset local count
//     } else {
//       alert("Please select a quantity first!");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
//       <div className="flex flex-col items-center">
//         <img
//           src={Img}
//           alt={item.name}
//           className="h-48 w-full object-cover rounded-md mb-4"
//         />
//         <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
//         <p className="text-gray-600">Price: ${item.price}</p>
//         <p className="text-gray-500 mb-2">Category: {item.category}</p>

//         {/* Quantity control */}
//         <div className="flex items-center gap-4 mt-2">
//           <button
//             className="px-3 py-1 bg-gray-200 rounded text-xl"
//             onClick={decrement}
//           >
//             -
//           </button>
//           <span className="text-lg font-medium">{quantity}</span>
//           <button
//             className="px-3 py-1 bg-gray-200 rounded text-xl"
//             onClick={increment}
//           >
//             +
//           </button>
//         </div>

//         {/* Add to Cart button */}
//         <button
//           className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 mt-4 rounded-lg transition"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuCard;

// src/components/MenuCard.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Img from "../assets/bg2.jpg";

const MenuCard = ({ item }) => {
  const { addToCart } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...item, quantity });
      setQuantity(0);
    } else {
      alert("Please select a quantity first!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition flex flex-col items-center">
      <img
        src={Img}
        alt={item.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600">Price: ${item.price}</p>
      <p className="text-gray-500 mb-2">Category: {item.category}</p>

      <div className="flex items-center gap-4 mt-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded text-xl"
          onClick={decrement}
        >
          -
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded text-xl"
          onClick={increment}
        >
          +
        </button>
      </div>

      <button
        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 mt-4 rounded-lg transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuCard;
