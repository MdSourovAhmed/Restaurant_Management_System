import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
   
    <div className="text-center p-5 mx-auto m-10 gap-14">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-teal-500 m-10">
            Welcome, {user.name || user.email} (Admin User)
          </h1>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-teal-500 m-10">
            Welcome to the Event Management System
          </h1>
        </>
      )}
      {/* <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
        See all the events.
      </p> */}
      <Link
        to={user ? "/admin" : "/login"}
        className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600"
      >
        Admin Page
      </Link>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <Link
          to={user ? "/admin/menu" : "/login"}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">Manage Menu</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Save and organize your favorite SURAHs.
          </p>
        </Link>
        <Link
          to={user ? "/admin/tables" : "/login"}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">
            Manage Tables
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your memorization journey.
          </p>
        </Link>
        <Link
          to={user ? "/admin/orders" : "/login"}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">
            Manage Order
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your memorization journey.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
