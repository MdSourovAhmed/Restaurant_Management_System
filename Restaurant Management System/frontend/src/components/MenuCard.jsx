import { Link } from "react-router-dom";
import Img from "../assets/bg2.jpg";
import { useState } from "react";

const MenuCard = ({ item }) => {
  const [val, setVal] = useState(0);

  const handleClick = (id) => {
    console.log("clicked on id: ", id);
  };
  const add = () => {
    setVal((prev) => prev + 1);
    console.log("clicked on add: ");
  };
  const minus = () => {
    val ? setVal((prev) => prev - 1) : 0;
    console.log("clicked on minus: ");
  };
  return (
    <div className="bg-white shadow-md rounded-lg flex justify-around gap-4 p-6 m-4 hover:shadow-lg transition">
      <div className="flex-col justify-around">
        <div className="object-cover h-50 overflow-hidden">
          <img src={Img} alt="" className=" rounded-sm h-1/1 w-70" />
        </div>
        <div className="mt-2">
          <div className="container mx-auto text-gray-700 items-center">
            <h3 className="text-xl font-semibold">Item Name: {item.name}</h3>
            {/* <p className="text-gray-600">{new Date(item.date).toLocaleDateString()}</p> */}
            <p className="text-gray-600">Price: {item.price}$</p>
            <p className="text-gray-500">Category: {item.category}</p>
          </div>
          {/* <div className="text-gray-500">Add to Cart</div>
          <div className="flex justify-between w-1/4">
            <div
              className="text-teal-400 text-xl cursor-pointer"
              onClick={() => {add(val)
              }}
            >
              +
            </div>
            <div className="text-teal-400 text-xl">{val}</div>
            <div
              className="text-teal-400 text-xl cursor-pointer"
              onClick={() => {
                minus(val)
              }}
            >
              -
            </div>
          </div> */}
        </div>
        {/* </div>
      <div className="mt-4"> */}
        {/* <div>
          <button
            className="bg-teal-300 px-4 py-2 mt-2 cursor-pointer rounded-lg text-white"
            onClick={() => handleClick(item._id)}
          >
            Order Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MenuCard;
