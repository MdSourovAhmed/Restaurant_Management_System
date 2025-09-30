import { Link } from "react-router-dom";

const ReservationCard = ({ reservation, handleDelete, handleEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition">
      {/* <div className="flex flex-col justify-evenly gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-center">
        <div className="">
          {" "}
          <h3 className="text-xl font-semibold">
            {reservation.customerName}
          </h3>{" "}
          {/* <p className="text-gray-600">{new Date(reservation.date).toLocaleDateString()}</p> */}
          <p className="text-gray-600">{reservation.number}</p>{" "}
          <p className="text-gray-500">
            {new Date(reservation.reservationTime).toLocaleString()}
          </p>{" "}
          <p className="text-gray-600">{reservation.partySize}</p>{" "}
          <p className="text-gray-600">{reservation.status}</p>{" "}
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleEdit(reservation)}
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(reservation._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
