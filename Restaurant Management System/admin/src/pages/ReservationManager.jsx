import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ReservationForm from "./Forms/ReservationForm";
import ReservationCard from "../components/ReservationCard";

const ReservationManager = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setReservations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reservation Management</h2>
      <ReservationForm
        fetchReservations={fetchReservations}
        editingReservation={editingReservation}
        setEditingReservation={setEditingReservation}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {reservations.map((reservation) => (
          <ReservationCard
            reservation={reservation}
            key={reservation._id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationManager;
