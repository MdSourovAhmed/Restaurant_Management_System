// // import { useState, useEffect } from 'react';
// // import api from '../services/api';

// // const RegistrationManagement = () => {
// //   const [registrations, setRegistrations] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchRegistrations = async () => {
// //       try {
// //         const response = await api.get('/admin/registrations');
// //         console.log(response.data);
// //         setRegistrations(response.data);
// //       } catch (err) {
// //         setError('Failed to fetch registrations');
// //       }
// //     };
// //     fetchRegistrations();
// //   }, []);

// //   if (error) return <div className="text-red-500 text-center">{error}</div>;

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-4">Manage Registrations</h2>
// //       <div className="space-y-4">
// //         {registrations.map((reg) => (
// //           <div key={reg._id} className="bg-white shadow-md rounded-lg p-6">
// //             <h3 className="text-xl font-semibold">{reg.event?reg.event.title:''}</h3>
// //             <p>User: {reg.user.name} ({reg.user.email})</p>
// //             <p>Status: {reg.status}</p>
// //             <p>Registered At: {new Date(reg.registeredAt).toLocaleDateString()}</p>
// //             {reg.qrCode && <img src={reg.qrCode} alt="QR Code" className="w-32 h-32 mt-2" />}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegistrationManagement;

// import { useState, useEffect } from "react";
// import api from "../services/api";

// const RegistrationManagement = () => {
//   const [eventRegistrations, setEventRegistrations] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRegistrations = async () => {
//       try {
//         const response = await api.get("/admin/registrations/by-event");
//         setEventRegistrations(response.data);
//       } catch (err) {
//         setError("Failed to fetch registrations");
//       }
//     };
//     fetchRegistrations();
//   }, []);

//   const handleReject = async (registrationId) => {
//     if (window.confirm("Are you sure you want to reject this registration?")) {
//       try {
//         await api.delete(`/admin/registrations/${registrationId}`);
//         setEventRegistrations(
//           eventRegistrations.map((eventData) => ({
//             ...eventData,
//             registrations: eventData.registrations.filter(
//               (reg) => reg._id !== registrationId
//             ),
//           }))
//         );
//         alert("Registration rejected successfully.");
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to reject registration"
//         );
//       }
//     }
//   };

//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Registrations</h2>
//       <div className="space-y-6">
//         {eventRegistrations.length === 0 ? (
//           <p className="text-gray-600">No registrations yet.</p>
//         ) : (
//           eventRegistrations.map(({ event, registrations }) => (
//             {(event?<>
//             <div key={event._id} className="bg-white shadow-md rounded-lg p-6">
//               <h3 className="text-xl font-semibold mb-2">
//                 {event.title ? event.title : ""}
//               </h3>
//               <p className="text-gray-600 mb-2">
//                 Date: {new Date(event.date).toLocaleDateString()}
//               </p>
//               <p className="text-gray-600 mb-2">Location: {event.location}</p>
//               <h4 className="text-lg font-medium mt-4 mb-2">
//                 Registered Users
//               </h4>
//               </>):<p>No Events Found</p>}
//               {registrations.filter((reg) => reg.status === "registered")
//                 .length === 0 ? (
//                 <p className="text-gray-500">No registered users.</p>
//               ) : (
//                 <ul className="list-disc pl-5 mb-4">
//                   {registrations
//                     .filter((reg) => reg.status === "registered")
//                     .map((reg) => (
//                       <li
//                         key={reg._id}
//                         className="flex justify-between items-center"
//                       >
//                         <span>
//                           {reg.user.name} ({reg.user.email})
//                         </span>
//                         <button
//                           onClick={() => handleReject(reg._id)}
//                           className="text-red-500 hover:underline"
//                         >
//                           Reject
//                         </button>
//                       </li>
//                     ))}
//                 </ul>
//               )}
//               <h4 className="text-lg font-medium mt-4 mb-2">Canceled Users</h4>
//               {registrations.filter((reg) => reg.status === "cancelled")
//                 .length === 0 ? (
//                 <p className="text-gray-500">No canceled users.</p>
//               ) : (
//                 <ul className="list-disc pl-5">
//                   {registrations
//                     .filter((reg) => reg.status === "cancelled")
//                     .map((reg) => (
//                       <li
//                         key={reg._id}
//                         className="flex justify-between items-center"
//                       >
//                         <span>
//                           {reg.user.name} ({reg.user.email})
//                         </span>
//                         <button
//                           onClick={() => handleReject(reg._id)}
//                           className="text-red-500 hover:underline"
//                         >
//                           Reject
//                         </button>
//                       </li>
//                     ))}
//                 </ul>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationManagement;




import { useState, useEffect } from "react";
import api from "../utils/api";

const RegistrationManagement = () => {
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/admin/registrations/by-event");
        setEventRegistrations(response.data);
      } catch (err) {
        setError("Failed to fetch registrations");
      }
    };
    fetchRegistrations();
  }, []);

  const handleReject = async (registrationId) => {
    if (window.confirm("Are you sure you want to reject this registration?")) {
      try {
        await api.delete(`/admin/registrations/${registrationId}`);
        setEventRegistrations((prev) =>
          prev.map((eventData) => ({
            ...eventData,
            registrations: eventData.registrations.filter(
              (reg) => reg._id !== registrationId
            ),
          }))
        );
        alert("Registration rejected successfully.");
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to reject registration"
        );
      }
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Registrations</h2>
      <div className="space-y-6">
        {eventRegistrations.length === 0 ? (
          <p className="text-gray-600">No registrations yet.</p>
        ) : (
          eventRegistrations.map(({ event, registrations }) =>
            event ? (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {event.title || "Untitled Event"}
                </h3>
                <p className="text-gray-600 mb-2">
                  Date:{" "}
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  Location: {event.location || "N/A"}
                </p>

                {/* Registered Users */}
                <h4 className="text-lg font-medium mt-4 mb-2">
                  Registered Users
                </h4>
                {registrations?.filter((reg) => reg.status === "registered")
                  .length === 0 ? (
                  <p className="text-gray-500">No registered users.</p>
                ) : (
                  <ul className="list-disc pl-5 mb-4">
                    {registrations
                      .filter((reg) => reg.status === "registered")
                      .map((reg) => (
                        <li
                          key={reg._id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {reg.user
                              ? `${reg.user.name} (${reg.user.email})`
                              : "Unknown User"}
                          </span>
                          <button
                            onClick={() => handleReject(reg._id)}
                            className="text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </li>
                      ))}
                  </ul>
                )}

                {/* Cancelled Users */}
                <h4 className="text-lg font-medium mt-4 mb-2">Cancelled Users</h4>
                {registrations?.filter((reg) => reg.status === "cancelled")
                  .length === 0 ? (
                  <p className="text-gray-500">No cancelled users.</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {registrations
                      .filter((reg) => reg.status === "cancelled")
                      .map((reg) => (
                        <li key={reg._id}>
                          {reg.user
                            ? `${reg.user.name} (${reg.user.email})`
                            : "Unknown User"}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ) : (
              <p key={Math.random()} className="text-gray-600">
                No Event Found
              </p>
            )
          )
        )}
      </div>
    </div>
  );
};

export default RegistrationManagement;
