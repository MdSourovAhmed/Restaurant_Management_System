import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ReservationForm = ({ fetchReservations, editingReservation, setEditingReservation }) => {
  const [formData, setFormData] = useState({
    tableId: '',
    customerName: '',
    reservationTime: '',
    partySize: '',
  });
  const [tables, setTables] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingReservation) {
      setFormData({
        tableId: editingReservation.table?._id,
        customerName: editingReservation.customerName,
        reservationTime: new Date(editingReservation.reservationTime).toISOString().slice(0, 16),
        partySize: editingReservation.partySize,
      });
    }
    const fetchTables = async () => {
      try {
        const response = await api.get('/tables/availability');
        setTables(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTables();
  }, [editingReservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const url = editingReservation
        ? `/reservations/${editingReservation._id}`
        : '/reservations';
      const method = editingReservation ? 'patch' : 'post';
      const response = await api[method](url, {
        ...formData,
        reservationTime: new Date(formData.reservationTime).toISOString(),
      });
      setSuccess(editingReservation ? 'Reservation updated!' : 'Reservation created!');
      setFormData({ tableId: '', customerName: '', reservationTime: '', partySize: '' });
      setEditingReservation(null);
      fetchReservations();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium">Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Table</label>
        <select
          value={formData.tableId}
          onChange={(e) => setFormData({ ...formData, tableId: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        >
          <option value="">Select a table</option>
          {tables.map(table => (
            <option key={table._id} value={table._id}>
              Table {table.number} (Capacity: {table.capacity})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Reservation Time</label>
        <input
          type="datetime-local"
          value={formData.reservationTime}
          onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Party Size</label>
        <input
          type="number"
          value={formData.partySize}
          onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {editingReservation ? 'Update Reservation' : 'Add Reservation'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default ReservationForm;