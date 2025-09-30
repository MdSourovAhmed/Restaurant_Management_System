// // import VerseCard from "./VerseCard"; // Added import
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../utils/api";
// import { useNavigate } from "react-router-dom";

// function RegisteredList({ registrationData }) {

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleCancel = (eventId) => {
//     console.log(eventId);
//     if (!user) navigate("/login");
//     else {
//       api
//         .post(`/registrations/:${eventId}`)
//         .then((res) => {
//           // console.log(res.data);
//         })
//         .catch((err) => console.error("Error canceling the Event:", err));
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-4">
//       {registrationData.length === 0 ? (
//         <p className="text-gray-600 dark:text-gray-300">No events added yet.</p>
//       ) : (
//         registrationData.map((data) => (
//           <div
//             key={data.event._id}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             {/* <h3 className="text-lg font-semibold">event {event.name}</h3>
//             <p className="text-gray-600 dark:text-gray-300">
//               Verse Ranges: {event.verseRanges.join(', ') || 'None'}
//             </p> */}

//             <h3 className="text-xl font-semibold">{data.event.title}</h3>
//             <p className="text-gray-600">
//               {new Date(data.event.date).toLocaleDateString()}
//             </p>
//             <p className="text-gray-600">{data.event.location}</p>
//             <p className="text-gray-500">{data.event.description}</p>
//             <button
//               onClick={()=>handleCancel(data.event._id)}
//               className="bg-teal-500 text-white p-2 mt-2 rounded-lg hover:bg-teal-600"
//             >
//               Cancel Registration
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default RegisteredList;

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";

function RegisteredList({ registrationData }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleCancel = (eventId) => {
    if (!user) {
      navigate("/login");
    } else {
      api
        .delete(`/registrations/${eventId}`) // better use DELETE for cancel
        .then((res) => {
          console.log("Event canceled:", res.data);
        })
        .catch((err) => console.error("Error canceling the Event:", err));
    }
  };

  const toggleDetails = (eventId) => {
    setSelectedEventId((prev) => (prev === eventId ? null : eventId));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {registrationData.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No events added yet.</p>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrationData.map((reg) => (
            <EventCard event={reg.event}/>
            //       <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
            //         <h3 className="text-xl font-semibold">{reg.event.title}</h3>
            //         <p className="text-gray-600">
            //           {new Date(reg.event.date).toLocaleDateString()}
            //         </p>
            //         <p className="text-gray-600">{reg.event.location}</p>
            //         <p className="text-gray-500">{reg.event.description}</p>
            //         {/* <Link to={`/events/${event._id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            //   View Details
            // </Link> */}
            //       </div>
            // <EventCard key={reg.event._id} event={reg.event} />
          ))}
        </div>
        // <div className="space-y-4">
        //   {registrationData.map((reg) => (
        //     <div key={reg._id} className="bg-white shadow-md rounded-lg p-6">
        //       <h3 className="text-xl font-semibold">{reg.event.title}</h3>
        //       <p className="text-gray-600">
        //         Date: {new Date(reg.event.date).toLocaleDateString()}
        //       </p>
        //       <p className="text-gray-600">Status: {reg.status}</p>
        //       <p className="text-gray-600">
        //         Cancellation Deadline:{" "}
        //         {new Date(reg.cancellationDeadline).toLocaleDateString()}
        //       </p>
        //       {reg.qrCode && (
        //         <img
        //           src={reg.qrCode}
        //           alt="QR Code"
        //           className="w-32 h-32 mt-2"
        //         />
        //       )}
        //       {reg.status === "registered" &&
        //       new Date() <= new Date(reg.cancellationDeadline) ? (
        //         <button
        //           onClick={() => handleCancel(reg._id)}
        //           className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        //         >
        //           Cancel Registration
        //         </button>
        //       ) : (
        //         <p className="text-red-500 mt-2">
        //           {reg.status === "cancelled"
        //             ? "Cancelled"
        //             : "Cancellation period has expired"}
        //         </p>
        //       )}
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
}

export default RegisteredList;
