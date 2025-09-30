import React, { useState, useEffect } from 'react';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
      <ul className="list-disc pl-5">
        {reservations.map(reservation => (
          <li key={reservation._id} className="mb-2">
            {reservation.customerName} - Table {reservation.table?.number} at {new Date(reservation.reservationTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;