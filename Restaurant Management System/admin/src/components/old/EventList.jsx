import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";

function EventList({ events }) {
  const {res,setRes}=useState([]);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegistration = async (eventId) => {
    // if (!user) navigate("/login");
    // else {
      // api
      //   .post("/registration")
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => console.error("Error fetching Events:", err));
      try {
        const response=await api.post("/registrations", { eventId });
        setRes(response.message);
        // setSuccess(
        //   "Registration successful! Check your email for confirmation."
        // );
        setTimeout(() => navigate("/registrations"), 1000);
      } catch (err) {
        console.error(err.response?.data?.message || "Failed to register");
      }
    // }
  };

  return (
    <div className="">
      {events.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No events added yet.</p>
      ) : (
        <div className="bg-gray-800 grid items-center grid-cols-1 md:grid-cols-2 md:items-center lg:grid-cols-3 lg:items-center gap-4">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
          // events.map((event) => (
          // <div
          //   key={event._id}
          //   className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          // >
          //   <h3 className="text-xl font-semibold">{event.title}</h3>
          //   <p className="text-gray-600">
          //     {new Date(event.date).toLocaleDateString()}
          //   </p>
          //   <p className="text-gray-600">{event.location}</p>
          //   <p className="text-gray-500">{event.description}</p>
          //   <button
          //     onClick={() => handleRegistration(event._id)}
          //     className="bg-teal-500 text-white p-2 mt-2  rounded-lg hover:bg-teal-600"
          //   >
          //     Register Now
          //   </button>
          //   <div className="mt-2 text-red-400" >{res}</div>
          // </div>
        // ))
      )}
    </div>
  );
}

export default EventList;

// function EventList(){
// return (
//   <>
//   <h1>Event Lists</h1>
//   </>
// )
// };

// export default EventList;
