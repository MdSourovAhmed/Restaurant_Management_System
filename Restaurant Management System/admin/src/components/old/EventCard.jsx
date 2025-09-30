// import { Link } from "react-router-dom";

// function Card({ event }) {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 m-4 md:h-50 hover:shadow-lg transition">
//       <h3 className="text-xl font-semibold">{event.title}</h3>
//       <p className="text-gray-600">
//         {new Date(event.date).toLocaleDateString()}
//       </p>
//       <p className="text-gray-600">Location: {event.location}</p>
//       <p className="text-gray-500">{event.description}</p>
//       <p className="text-gray-500">Capacity: {event.capacity}</p>
//       {/* <Link to={`/events/${event._id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         View Details
//       </Link> */}
//     </div>
//   );
// }

// export default Card;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

function EventCard({ event }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is registered for the event
  useEffect(() => {
    const checkRegistration = async () => {
      if (user) {
        try {
          const response = await api.get("/registrations/my");
          const registrations = response.data;
          const isUserRegistered = registrations.some(
            (reg) => reg.event._id === event._id && reg.status === "registered"
          );
          setIsRegistered(isUserRegistered);
        } catch (err) {
          console.error("Failed to check registration status:", err);
        }
      }
    };
    checkRegistration();
  }, [user, event._id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/registrations", { eventId: event._id });
      setSuccess("Registration successful! Check your email for confirmation.");
      setIsRegistered(true);
      setTimeout(() => {
        setSuccess(null);
        setIsModalOpen(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  const handleCancel = async () => {
    try {
      const response = await api.get("/registrations/my");
      const registration = response.data.find(
        (reg) => reg.event._id === event._id && reg.status === "registered"
      );
      if (registration) {
        await api.delete(`/registrations/${registration._id}`);
        setSuccess("Registration cancelled successfully.");
        setIsRegistered(false);
        setTimeout(() => {
          setSuccess(null);
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel registration");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      {/* Event Card with Fixed Dimensions */}
      <div className="bg-white shadow-md rounded-lg p-6 m-4 justify-between hover:shadow-lg transition">
        <div>
          <h3 className="text-xl font-semibold truncate">{event.title}</h3>
          <p className="text-gray-600">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 truncate">Location: {event.location}</p>
          <p className="text-gray-500 line-clamp-2">{event.description}</p>
          <p className="text-gray-500">Capacity: {event.capacity}</p>
        </div>
        <button
          onClick={toggleModal}
          className="bg-teal-500 text-white p-2 mt-2 rounded-lg hover:bg-teal-600"
        >
          See Details
        </button>
      </div>

      {/* Full-Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
            <p className="text-gray-600 mb-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">Location: {event.location}</p>
            <p className="text-gray-600 mb-2">
              Description: {event.description}
            </p>
            <p className="text-gray-600 mb-4">
              Available Seats: {event.capacity - event.registeredUsers.length}
            </p>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            {user ? (
              isRegistered ? (
                new Date() <=
                new Date(
                  new Date(event.date).setDate(
                    new Date(event.date).getDate() - 1
                  )
                ) ? (
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <p className="text-red-500">
                    Cancellation period has expired
                  </p>
                )
              ) : event.capacity > event.registeredUsers.length ? (
                <button
                  onClick={handleRegister}
                  className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
                >
                  Register
                </button>
              ) : (
                <p className="text-red-500">Event is at full capacity</p>
              )
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600"
              >
                Login to Register
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EventCard;
