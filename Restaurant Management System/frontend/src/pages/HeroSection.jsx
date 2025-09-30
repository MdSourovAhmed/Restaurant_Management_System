import React, { useContext } from "react";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.jpg";
import { AuthContext } from "../contexts/AuthContext";

const HeroSection = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto h-120 relative p-6 mt-4 md:h-150 lg:h-150 rounded-lg">
      <div>
        <img
          src={homeImg}
          alt=""
          className="object-cover absolute w-1/1 h-4/4 left-0 top-0 md:h-150 lg:h-150 rounded-lg opacity-70"
        />
        <div className="absolute flex flex-col top-10 left-6 my-25 gap-2">
          <h1 className="text-teal-400 md:text-6xl lg:text-7xl font-bold leading-tight text-4xl">
            Streamline Your Restaurant.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl">
            All-in-one restaurant management system to handle orders, inventory,
            staff, and customers efficiently. Boost your productivity and grow
            your business.
          </p>
          {/* <button
            type="submit"
            className="bg-teal-500 text-white p-2 w-40 rounded-lg hover:bg-teal-600 cursor-pointer"
          >
            Order Now
          </button> */}
          <Link
            to={user ? "/orders" : "/login"}
            className="bg-teal-500 text-white p-2 w-40 rounded-lg hover:bg-teal-600 cursor-pointer"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};
// <div className="container relative mx-auto z-10 min-h-250 lg:max-h-3/4 flex flex-col items-center justify-center bg-gray-900 mt-6 rounded-lg">
//   <img
//     src={homeImg}
//     alt="hfdbhj"
//     className="rounded-lg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
//   />

//   {/* Content */}
//   <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
//     <div className="max-w-4xl mx-auto">
//       {/* Badge */}
//       <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
//         Trusted by 5,000+ Restaurants
//       </div>

//       {/* Main Heading */}
//       <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//         Streamline Your Restaurant
//         <span className="text-green-400"> Operations</span>
//       </h1>

//       {/* Subheading */}
//       <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
//         All-in-one restaurant management system to handle orders, inventory,
//         staff, and customers efficiently. Boost your productivity and grow
//         your business.
//       </p>
//     </div>
//   </div>
{
  /* Features Grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-green-400 text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-lg mb-2">Real-time Analytics</h3>
              <p className="text-gray-300 text-sm">Track sales and performance metrics</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-green-400 text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Fast Order Processing</h3>
              <p className="text-gray-300 text-sm">Streamline your order workflow</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-green-400 text-2xl mb-2">📱</div>
              <h3 className="font-semibold text-lg mb-2">Mobile Friendly</h3>
              <p className="text-gray-300 text-sm">Manage on-the-go from any device</p>
            </div>
          </div>

          {/* CTA Buttons */
}
{
  /* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-4 rounded-lg text-lg transition duration-300">
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */
}
{
  /* <div className="mt-12 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400 text-xl">⭐</span>
              ))}
              <span className="text-gray-300 ml-2">4.9/5 from 2,500+ reviews</span>
            </div>
            <p className="text-gray-400 text-sm">No credit card required • 14-day free trial • Setup in minutes</p>
          </div>
        </div>
      </div> */
}

{
  /* Scroll Indicator */
}
{
  /* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div> */
}
{
  /* </div>  */
}
// </div>
//   );
// };

export default HeroSection;
